import {
  lib
} from "./chunk-VY4OVUQW.mjs";
import {
  require_resolve
} from "./chunk-7OFFUVGP.mjs";
import {
  __toESM
} from "./chunk-FFZOTZQ3.mjs";

// node_modules/vite/dist/node/chunks/dep-53dc1ef4.js
var import_resolve = __toESM(require_resolve(), 1);
import require$$0 from "path";
import require$$0__default from "fs";
import { fileURLToPath as __cjs_fileURLToPath } from "node:url";
import { dirname as __cjs_dirname } from "node:path";
import { createRequire as __cjs_createRequire } from "node:module";
var __filename = __cjs_fileURLToPath(import.meta.url);
var __dirname = __cjs_dirname(__filename);
var require2 = __cjs_createRequire(import.meta.url);
var __require = require2;
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    var e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (var k in e) {
        if (k !== "default" && !(k in n)) {
          n[k] = e[k];
        }
      }
    }
  }
  return n;
}
var startsWithKeywordRegexp = /^(all|not|only|print|screen)/i;
var joinMedia$1 = function(parentMedia, childMedia) {
  if (!parentMedia.length && childMedia.length)
    return childMedia;
  if (parentMedia.length && !childMedia.length)
    return parentMedia;
  if (!parentMedia.length && !childMedia.length)
    return [];
  const media = [];
  parentMedia.forEach((parentItem) => {
    const parentItemStartsWithKeyword = startsWithKeywordRegexp.test(parentItem);
    childMedia.forEach((childItem) => {
      const childItemStartsWithKeyword = startsWithKeywordRegexp.test(childItem);
      if (parentItem !== childItem) {
        if (childItemStartsWithKeyword && !parentItemStartsWithKeyword) {
          media.push(`${childItem} and ${parentItem}`);
        } else {
          media.push(`${parentItem} and ${childItem}`);
        }
      }
    });
  });
  return media;
};
var joinLayer$1 = function(parentLayer, childLayer) {
  if (!parentLayer.length && childLayer.length)
    return childLayer;
  if (parentLayer.length && !childLayer.length)
    return parentLayer;
  if (!parentLayer.length && !childLayer.length)
    return [];
  return parentLayer.concat(childLayer);
};
var resolve$1 = import_resolve.default;
var moduleDirectories = ["web_modules", "node_modules"];
function resolveModule(id, opts) {
  return new Promise((res, rej) => {
    resolve$1(id, opts, (err, path2) => err ? rej(err) : res(path2));
  });
}
var resolveId$1 = function(id, base, options) {
  const paths = options.path;
  const resolveOpts = {
    basedir: base,
    moduleDirectory: moduleDirectories.concat(options.addModulesDirectories),
    paths,
    extensions: [".css"],
    packageFilter: function processPackage(pkg) {
      if (pkg.style)
        pkg.main = pkg.style;
      else if (!pkg.main || !/\.css$/.test(pkg.main))
        pkg.main = "index.css";
      return pkg;
    },
    preserveSymlinks: false
  };
  return resolveModule(`./${id}`, resolveOpts).catch(() => resolveModule(id, resolveOpts)).catch(() => {
    if (paths.indexOf(base) === -1)
      paths.unshift(base);
    throw new Error(
      `Failed to find '${id}'
  in [
    ${paths.join(",\n        ")}
  ]`
    );
  });
};
var readCacheExports = {};
var readCache$1 = {
  get exports() {
    return readCacheExports;
  },
  set exports(v) {
    readCacheExports = v;
  }
};
var pifyExports = {};
var pify$2 = {
  get exports() {
    return pifyExports;
  },
  set exports(v) {
    pifyExports = v;
  }
};
var processFn = function(fn, P, opts) {
  return function() {
    var that = this;
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    return new P(function(resolve2, reject) {
      args.push(function(err, result) {
        if (err) {
          reject(err);
        } else if (opts.multiArgs) {
          var results = new Array(arguments.length - 1);
          for (var i2 = 1; i2 < arguments.length; i2++) {
            results[i2 - 1] = arguments[i2];
          }
          resolve2(results);
        } else {
          resolve2(result);
        }
      });
      fn.apply(that, args);
    });
  };
};
var pify$1 = pify$2.exports = function(obj, P, opts) {
  if (typeof P !== "function") {
    opts = P;
    P = Promise;
  }
  opts = opts || {};
  opts.exclude = opts.exclude || [/.+Sync$/];
  var filter = function(key) {
    var match = function(pattern) {
      return typeof pattern === "string" ? key === pattern : pattern.test(key);
    };
    return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
  };
  var ret = typeof obj === "function" ? function() {
    if (opts.excludeMain) {
      return obj.apply(this, arguments);
    }
    return processFn(obj, P, opts).apply(this, arguments);
  } : {};
  return Object.keys(obj).reduce(function(ret2, key) {
    var x = obj[key];
    ret2[key] = typeof x === "function" && filter(key) ? processFn(x, P, opts) : x;
    return ret2;
  }, ret);
};
pify$1.all = pify$1;
var fs = require$$0__default;
var path$2 = require$$0;
var pify = pifyExports;
var stat = pify(fs.stat);
var readFile = pify(fs.readFile);
var resolve = path$2.resolve;
var cache = /* @__PURE__ */ Object.create(null);
function convert(content, encoding) {
  if (Buffer.isEncoding(encoding)) {
    return content.toString(encoding);
  }
  return content;
}
readCache$1.exports = function(path2, encoding) {
  path2 = resolve(path2);
  return stat(path2).then(function(stats) {
    var item = cache[path2];
    if (item && item.mtime.getTime() === stats.mtime.getTime()) {
      return convert(item.content, encoding);
    }
    return readFile(path2).then(function(data) {
      cache[path2] = {
        mtime: stats.mtime,
        content: data
      };
      return convert(data, encoding);
    });
  }).catch(function(err) {
    cache[path2] = null;
    return Promise.reject(err);
  });
};
readCacheExports.sync = function(path2, encoding) {
  path2 = resolve(path2);
  try {
    var stats = fs.statSync(path2);
    var item = cache[path2];
    if (item && item.mtime.getTime() === stats.mtime.getTime()) {
      return convert(item.content, encoding);
    }
    var data = fs.readFileSync(path2);
    cache[path2] = {
      mtime: stats.mtime,
      content: data
    };
    return convert(data, encoding);
  } catch (err) {
    cache[path2] = null;
    throw err;
  }
};
readCacheExports.get = function(path2, encoding) {
  path2 = resolve(path2);
  if (cache[path2]) {
    return convert(cache[path2].content, encoding);
  }
  return null;
};
readCacheExports.clear = function() {
  cache = /* @__PURE__ */ Object.create(null);
};
var dataURLRegexp = /^data:text\/css;base64,/i;
function isValid(url) {
  return dataURLRegexp.test(url);
}
function contents(url) {
  return Buffer.from(url.slice(21), "base64").toString();
}
var dataUrl = {
  isValid,
  contents
};
var readCache = readCacheExports;
var dataURL$1 = dataUrl;
var loadContent$1 = (filename) => {
  if (dataURL$1.isValid(filename)) {
    return dataURL$1.contents(filename);
  }
  return readCache(filename, "utf-8");
};
var path$1 = require$$0;
var sugarss;
var processContent$1 = function processContent(result, content, filename, options, postcss) {
  const { plugins } = options;
  const ext = path$1.extname(filename);
  const parserList = [];
  if (ext === ".sss") {
    if (!sugarss) {
      try {
        sugarss = __require("sugarss");
      } catch {
      }
    }
    if (sugarss)
      return runPostcss(postcss, content, filename, plugins, [sugarss]);
  }
  if (result.opts.syntax?.parse) {
    parserList.push(result.opts.syntax.parse);
  }
  if (result.opts.parser)
    parserList.push(result.opts.parser);
  parserList.push(null);
  return runPostcss(postcss, content, filename, plugins, parserList);
};
function runPostcss(postcss, content, filename, plugins, parsers, index2) {
  if (!index2)
    index2 = 0;
  return postcss(plugins).process(content, {
    from: filename,
    parser: parsers[index2]
  }).catch((err) => {
    index2++;
    if (index2 === parsers.length)
      throw err;
    return runPostcss(postcss, content, filename, plugins, parsers, index2);
  });
}
var valueParser = lib;
var { stringify } = valueParser;
function split(params, start) {
  const list = [];
  const last = params.reduce((item, node, index2) => {
    if (index2 < start)
      return "";
    if (node.type === "div" && node.value === ",") {
      list.push(item);
      return "";
    }
    return item + stringify(node);
  }, "");
  list.push(last);
  return list;
}
var parseStatements$1 = function(result, styles) {
  const statements = [];
  let nodes = [];
  styles.each((node) => {
    let stmt;
    if (node.type === "atrule") {
      if (node.name === "import")
        stmt = parseImport(result, node);
      else if (node.name === "media")
        stmt = parseMedia(result, node);
      else if (node.name === "charset")
        stmt = parseCharset(result, node);
    }
    if (stmt) {
      if (nodes.length) {
        statements.push({
          type: "nodes",
          nodes,
          media: [],
          layer: []
        });
        nodes = [];
      }
      statements.push(stmt);
    } else
      nodes.push(node);
  });
  if (nodes.length) {
    statements.push({
      type: "nodes",
      nodes,
      media: [],
      layer: []
    });
  }
  return statements;
};
function parseMedia(result, atRule) {
  const params = valueParser(atRule.params).nodes;
  return {
    type: "media",
    node: atRule,
    media: split(params, 0),
    layer: []
  };
}
function parseCharset(result, atRule) {
  if (atRule.prev()) {
    return result.warn("@charset must precede all other statements", {
      node: atRule
    });
  }
  return {
    type: "charset",
    node: atRule,
    media: [],
    layer: []
  };
}
function parseImport(result, atRule) {
  let prev = atRule.prev();
  if (prev) {
    do {
      if (prev.type !== "comment" && (prev.type !== "atrule" || prev.name !== "import" && prev.name !== "charset" && !(prev.name === "layer" && !prev.nodes))) {
        return result.warn(
          "@import must precede all other statements (besides @charset or empty @layer)",
          { node: atRule }
        );
      }
      prev = prev.prev();
    } while (prev);
  }
  if (atRule.nodes) {
    return result.warn(
      "It looks like you didn't end your @import statement correctly. Child nodes are attached to it.",
      { node: atRule }
    );
  }
  const params = valueParser(atRule.params).nodes;
  const stmt = {
    type: "import",
    node: atRule,
    media: [],
    layer: []
  };
  if (!params.length || (params[0].type !== "string" || !params[0].value) && (params[0].type !== "function" || params[0].value !== "url" || !params[0].nodes.length || !params[0].nodes[0].value)) {
    return result.warn(`Unable to find uri in '${atRule.toString()}'`, {
      node: atRule
    });
  }
  if (params[0].type === "string")
    stmt.uri = params[0].value;
  else
    stmt.uri = params[0].nodes[0].value;
  stmt.fullUri = stringify(params[0]);
  let remainder = params;
  if (remainder.length > 2) {
    if ((remainder[2].type === "word" || remainder[2].type === "function") && remainder[2].value === "layer") {
      if (remainder[1].type !== "space") {
        return result.warn("Invalid import layer statement", { node: atRule });
      }
      if (remainder[2].nodes) {
        stmt.layer = [stringify(remainder[2].nodes)];
      } else {
        stmt.layer = [""];
      }
      remainder = remainder.slice(2);
    }
  }
  if (remainder.length > 2) {
    if (remainder[1].type !== "space") {
      return result.warn("Invalid import media statement", { node: atRule });
    }
    stmt.media = split(remainder, 2);
  }
  return stmt;
}
var assignLayerNames$1 = function(layer, node, state, options) {
  layer.forEach((layerPart, i) => {
    if (layerPart.trim() === "") {
      if (options.nameLayer) {
        layer[i] = options.nameLayer(state.anonymousLayerCounter++, state.rootFilename).toString();
      } else {
        throw node.error(
          `When using anonymous layers in @import you must also set the "nameLayer" plugin option`
        );
      }
    }
  });
};
var path = require$$0;
var joinMedia = joinMedia$1;
var joinLayer = joinLayer$1;
var resolveId = resolveId$1;
var loadContent = loadContent$1;
var processContent2 = processContent$1;
var parseStatements = parseStatements$1;
var assignLayerNames = assignLayerNames$1;
var dataURL = dataUrl;
function AtImport(options) {
  options = {
    root: process.cwd(),
    path: [],
    skipDuplicates: true,
    resolve: resolveId,
    load: loadContent,
    plugins: [],
    addModulesDirectories: [],
    nameLayer: null,
    ...options
  };
  options.root = path.resolve(options.root);
  if (typeof options.path === "string")
    options.path = [options.path];
  if (!Array.isArray(options.path))
    options.path = [];
  options.path = options.path.map((p) => path.resolve(options.root, p));
  return {
    postcssPlugin: "postcss-import",
    Once(styles, { result, atRule, postcss }) {
      const state = {
        importedFiles: {},
        hashFiles: {},
        rootFilename: null,
        anonymousLayerCounter: 0
      };
      if (styles.source?.input?.file) {
        state.rootFilename = styles.source.input.file;
        state.importedFiles[styles.source.input.file] = {};
      }
      if (options.plugins && !Array.isArray(options.plugins)) {
        throw new Error("plugins option must be an array");
      }
      if (options.nameLayer && typeof options.nameLayer !== "function") {
        throw new Error("nameLayer option must be a function");
      }
      return parseStyles(result, styles, options, state, [], []).then(
        (bundle) => {
          applyRaws(bundle);
          applyMedia(bundle);
          applyStyles(bundle, styles);
        }
      );
      function applyRaws(bundle) {
        bundle.forEach((stmt, index2) => {
          if (index2 === 0)
            return;
          if (stmt.parent) {
            const { before } = stmt.parent.node.raws;
            if (stmt.type === "nodes")
              stmt.nodes[0].raws.before = before;
            else
              stmt.node.raws.before = before;
          } else if (stmt.type === "nodes") {
            stmt.nodes[0].raws.before = stmt.nodes[0].raws.before || "\n";
          }
        });
      }
      function applyMedia(bundle) {
        bundle.forEach((stmt) => {
          if (!stmt.media.length && !stmt.layer.length || stmt.type === "charset") {
            return;
          }
          if (stmt.layer.length > 1) {
            assignLayerNames(stmt.layer, stmt.node, state, options);
          }
          if (stmt.type === "import") {
            const parts = [stmt.fullUri];
            const media = stmt.media.join(", ");
            if (stmt.layer.length) {
              const layerName = stmt.layer.join(".");
              let layerParams = "layer";
              if (layerName) {
                layerParams = `layer(${layerName})`;
              }
              parts.push(layerParams);
            }
            if (media) {
              parts.push(media);
            }
            stmt.node.params = parts.join(" ");
          } else if (stmt.type === "media") {
            if (stmt.layer.length) {
              const layerNode = atRule({
                name: "layer",
                params: stmt.layer.join("."),
                source: stmt.node.source
              });
              if (stmt.parentMedia?.length) {
                const mediaNode = atRule({
                  name: "media",
                  params: stmt.parentMedia.join(", "),
                  source: stmt.node.source
                });
                mediaNode.append(layerNode);
                layerNode.append(stmt.node);
                stmt.node = mediaNode;
              } else {
                layerNode.append(stmt.node);
                stmt.node = layerNode;
              }
            } else {
              stmt.node.params = stmt.media.join(", ");
            }
          } else {
            const { nodes } = stmt;
            const { parent } = nodes[0];
            let outerAtRule;
            let innerAtRule;
            if (stmt.media.length && stmt.layer.length) {
              const mediaNode = atRule({
                name: "media",
                params: stmt.media.join(", "),
                source: parent.source
              });
              const layerNode = atRule({
                name: "layer",
                params: stmt.layer.join("."),
                source: parent.source
              });
              mediaNode.append(layerNode);
              innerAtRule = layerNode;
              outerAtRule = mediaNode;
            } else if (stmt.media.length) {
              const mediaNode = atRule({
                name: "media",
                params: stmt.media.join(", "),
                source: parent.source
              });
              innerAtRule = mediaNode;
              outerAtRule = mediaNode;
            } else if (stmt.layer.length) {
              const layerNode = atRule({
                name: "layer",
                params: stmt.layer.join("."),
                source: parent.source
              });
              innerAtRule = layerNode;
              outerAtRule = layerNode;
            }
            parent.insertBefore(nodes[0], outerAtRule);
            nodes.forEach((node) => {
              node.parent = void 0;
            });
            nodes[0].raws.before = nodes[0].raws.before || "\n";
            innerAtRule.append(nodes);
            stmt.type = "media";
            stmt.node = outerAtRule;
            delete stmt.nodes;
          }
        });
      }
      function applyStyles(bundle, styles2) {
        styles2.nodes = [];
        bundle.forEach((stmt) => {
          if (["charset", "import", "media"].includes(stmt.type)) {
            stmt.node.parent = void 0;
            styles2.append(stmt.node);
          } else if (stmt.type === "nodes") {
            stmt.nodes.forEach((node) => {
              node.parent = void 0;
              styles2.append(node);
            });
          }
        });
      }
      function parseStyles(result2, styles2, options2, state2, media, layer) {
        const statements = parseStatements(result2, styles2);
        return Promise.resolve(statements).then((stmts) => {
          return stmts.reduce((promise, stmt) => {
            return promise.then(() => {
              stmt.media = joinMedia(media, stmt.media || []);
              stmt.parentMedia = media;
              stmt.layer = joinLayer(layer, stmt.layer || []);
              if (stmt.type !== "import" || /^(?:[a-z]+:)?\/\//i.test(stmt.uri)) {
                return;
              }
              if (options2.filter && !options2.filter(stmt.uri)) {
                return;
              }
              return resolveImportId(result2, stmt, options2, state2);
            });
          }, Promise.resolve());
        }).then(() => {
          let charset;
          const imports = [];
          const bundle = [];
          function handleCharset(stmt) {
            if (!charset)
              charset = stmt;
            else if (stmt.node.params.toLowerCase() !== charset.node.params.toLowerCase()) {
              throw new Error(
                `Incompatable @charset statements:
  ${stmt.node.params} specified in ${stmt.node.source.input.file}
  ${charset.node.params} specified in ${charset.node.source.input.file}`
              );
            }
          }
          statements.forEach((stmt) => {
            if (stmt.type === "charset")
              handleCharset(stmt);
            else if (stmt.type === "import") {
              if (stmt.children) {
                stmt.children.forEach((child, index2) => {
                  if (child.type === "import")
                    imports.push(child);
                  else if (child.type === "charset")
                    handleCharset(child);
                  else
                    bundle.push(child);
                  if (index2 === 0)
                    child.parent = stmt;
                });
              } else
                imports.push(stmt);
            } else if (stmt.type === "media" || stmt.type === "nodes") {
              bundle.push(stmt);
            }
          });
          return charset ? [charset, ...imports.concat(bundle)] : imports.concat(bundle);
        });
      }
      function resolveImportId(result2, stmt, options2, state2) {
        if (dataURL.isValid(stmt.uri)) {
          return loadImportContent(result2, stmt, stmt.uri, options2, state2).then(
            (result3) => {
              stmt.children = result3;
            }
          );
        }
        const atRule2 = stmt.node;
        let sourceFile;
        if (atRule2.source?.input?.file) {
          sourceFile = atRule2.source.input.file;
        }
        const base = sourceFile ? path.dirname(atRule2.source.input.file) : options2.root;
        return Promise.resolve(options2.resolve(stmt.uri, base, options2)).then((paths) => {
          if (!Array.isArray(paths))
            paths = [paths];
          return Promise.all(
            paths.map((file) => {
              return !path.isAbsolute(file) ? resolveId(file, base, options2) : file;
            })
          );
        }).then((resolved) => {
          resolved.forEach((file) => {
            result2.messages.push({
              type: "dependency",
              plugin: "postcss-import",
              file,
              parent: sourceFile
            });
          });
          return Promise.all(
            resolved.map((file) => {
              return loadImportContent(result2, stmt, file, options2, state2);
            })
          );
        }).then((result3) => {
          stmt.children = result3.reduce((result4, statements) => {
            return statements ? result4.concat(statements) : result4;
          }, []);
        });
      }
      function loadImportContent(result2, stmt, filename, options2, state2) {
        const atRule2 = stmt.node;
        const { media, layer } = stmt;
        assignLayerNames(layer, atRule2, state2, options2);
        if (options2.skipDuplicates) {
          if (state2.importedFiles[filename]?.[media]?.[layer]) {
            return;
          }
          if (!state2.importedFiles[filename]) {
            state2.importedFiles[filename] = {};
          }
          if (!state2.importedFiles[filename][media]) {
            state2.importedFiles[filename][media] = {};
          }
          state2.importedFiles[filename][media][layer] = true;
        }
        return Promise.resolve(options2.load(filename, options2)).then(
          (content) => {
            if (content.trim() === "") {
              result2.warn(`${filename} is empty`, { node: atRule2 });
              return;
            }
            if (state2.hashFiles[content]?.[media]?.[layer]) {
              return;
            }
            return processContent2(
              result2,
              content,
              filename,
              options2,
              postcss
            ).then((importedResult) => {
              const styles2 = importedResult.root;
              result2.messages = result2.messages.concat(importedResult.messages);
              if (options2.skipDuplicates) {
                const hasImport = styles2.some((child) => {
                  return child.type === "atrule" && child.name === "import";
                });
                if (!hasImport) {
                  if (!state2.hashFiles[content]) {
                    state2.hashFiles[content] = {};
                  }
                  if (!state2.hashFiles[content][media]) {
                    state2.hashFiles[content][media] = {};
                  }
                  state2.hashFiles[content][media][layer] = true;
                }
              }
              return parseStyles(result2, styles2, options2, state2, media, layer);
            });
          }
        );
      }
    }
  };
}
AtImport.postcss = true;
var postcssImport = AtImport;
var index = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: postcssImport
}, [postcssImport]);
export {
  index as i
};