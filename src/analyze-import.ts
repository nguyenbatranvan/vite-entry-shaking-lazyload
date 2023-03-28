import type MagicString from 'magic-string';
import type {ResolveFn} from 'vite';
import {normalizePath} from 'vite';

import type {EntryExports, EntryPath, ImportInput, TargetImports} from './types';

/**
 * Returns the import params of a single imported entity.
 * @param importString Import statement string.
 */
const getImportParams = (importString: string) => {
    const [name, alias] = importString.trim().split(' as ');
    return {name, alias};
};

/**
 * Returns the names of the entities imported from the target entry.
 * @param code Import statement string.
 * @param startPosition Start position of the import statement.
 * @param endPosition End position of the import statement.
 */
const getImportedNamedExports = (
    code: string,
    startPosition: number,
    endPosition: number,
): { name: string[], chunk: string } => {
    const a = {
        name: [],
        chunk: ""
    }
    if (code.slice(
        startPosition,
        endPosition,
    ).match(/{([\s\S]*?)}/)) {
        const [, importContentString] = code.slice(
            startPosition,
            endPosition,
        ).match(/{([\s\S]*?)}/) ?? [];

        a.name = (importContentString?.split(',') ?? [])
            .map((namedExport) => namedExport.trim());
    } else {
        const sliceCode = code.slice(
            startPosition,
            endPosition + 50,
        )
        let index = null;
        if (sliceCode.match('default:')) {
            a.chunk = "."
            index = sliceCode.match('default:').index;
        } else if (sliceCode.match('resolveComponent:')) {
            index = sliceCode.match('resolveComponent:').index;
            a.chunk = ","
        }
        a.name.push(sliceCode.slice(index).split('.')[1].split('\n')[0])
    }
    return a;

};

/**
 * Returns a structured information map about entities imported from target entry.
 * @param entryExports List of analyzed exports of the target entry.
 * @param entryPath Absolute path to the target entry.
 * @param imports List of named imports.
 * @param resolver Vite's resolve function.
 */
const getImportsMap = async (
    entryExports: EntryExports,
    entryPath: EntryPath,
    imports: string[],
    resolver: ResolveFn,
): Promise<TargetImports> => {
    const map: TargetImports = new Map([]);

    await Promise.all(
        imports.map(async (importString) => {
            const {name, alias} = methods.getImportParams(importString);
            const namedImport = entryExports.get(name);
            if (namedImport) {
                const resolvedPath = await resolver(namedImport.path, entryPath);
                if (resolvedPath) {
                    const {importDefault, originalName} = namedImport;
                    map.set(resolvedPath, [
                        ...(map.get(resolvedPath) ?? []),
                        {name, importDefault, originalName, alias},
                    ]);
                }
            } else {
                map.set(entryPath, [
                    ...(map.get(entryPath) ?? []),
                    {name, importDefault: false},
                ]);
            }
        }),
    );

    return map;
};

/**
 * Formats a single entity import replacement.
 * @param analyzedImport Analyzed import.
 */
const formatImportReplacement = ({
                                     name,
                                     alias,
                                     originalName,
                                     importDefault,
                                 }: ImportInput) => {
    if (importDefault) {
        return `default as ${alias ?? originalName ?? name}`;
    }

    if (originalName) {
        return `${originalName}${alias ? ` as ${alias}` : ` as ${name}`}`;
    }

    return `${name}${alias ? ` as ${alias}` : ''}`;
};

/**
 * Returns a single target import's replacement lines.
 * @param imported Analyzed imported entities from target entry.
 */
const getImportReplacement = (
    imported: TargetImports,
): `import ${string}`[] => {
    const replacement: `import ${string}`[] = [];
    imported.forEach((importedItems, importedPath) => {
        const path = normalizePath(importedPath);
        const imports = importedItems
            .map((importedItem) => methods.formatImportReplacement(importedItem));
        replacement.push(`import { ${imports.join(', ')} } from '${path}'`);
    });

    return replacement;
};

/**
 * Analyzes a single target import.
 * @param src MagicString instance to prepare transforms.
 * @param code Source code of the file.
 * @param entryExports List of analyzed exports of the target entry.
 * @param entryPath Absolute path to the target entry.
 * @param startPosition Start position of the import statement.
 * @param endPosition End position of the import statement.
 * @param resolver Vite's resolve function.
 */
const analyzeImportStatement = async (
    src: MagicString,
    code: string,
    entryExports: EntryExports,
    entryPath: EntryPath,
    startPosition: number,
    endPosition: number,
    resolver: ResolveFn,
) => {
    const {name, chunk} = methods.getImportedNamedExports(code, startPosition, endPosition);
    const imported = await methods.getImportsMap(entryExports, entryPath, name, resolver);
    const replacement = methods.getImportReplacement(imported);
    const isDefault = checkIsDefaultExport([...imported][0])
    if (!chunk) {
        src.overwrite(
            startPosition,
            endPosition + 1,
            `${replacement.join(';\n')};`,
        );
    } else {
        if (!isDefault)
            src.overwrite(startPosition, endPosition + 1, 'import(' + replacement[0].split("from")[1] + ')' + chunk)
        else {
            const codeLazy = code.slice(startPosition, endPosition + 200);
            const findCode = codeLazy.indexOf(";")
            src.overwrite(startPosition, startPosition + findCode, 'import(' + replacement[0].split("from")[1] + '))')
        }

    }
};

const checkIsDefaultExport = (key) => {
    return key[1][0].importDefault;
}

const methods = {
    getImportParams,
    getImportedNamedExports,
    getImportsMap,
    getImportReplacement,
    formatImportReplacement,
    analyzeImportStatement,
};

export default methods;
