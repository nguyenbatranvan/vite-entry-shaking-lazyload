import { PluginOption } from 'vite';

/** Vite plugin options. */
type PluginOptions = {
    targets: PluginTargets;
    extensions?: string[];
    ignorePatterns?: any[];
    debug?: boolean;
};
/** Resolved absolute path of target. */
type EntryPath = string;
/** List of targets being processed by the plugin. */
type PluginTargets = EntryPath[];

declare function createEntryShakingPlugin(userOptions: PluginOptions): Promise<PluginOption>;

export { createEntryShakingPlugin as default };
