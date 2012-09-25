/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.0.0 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

var requirejs,require,define;(function(global){function isFunction(it){return ostring.call(it)==="[object Function]"}function isArray(it){return ostring.call(it)==="[object Array]"}function each(ary,func){if(ary){var i;for(i=0;i<ary.length;i+=1)if(func(ary[i],i,ary))break}}function eachReverse(ary,func){if(ary){var i;for(i=ary.length-1;i>-1;i-=1)if(func(ary[i],i,ary))break}}function hasProp(obj,prop){return obj.hasOwnProperty(prop)}function eachProp(obj,func){var prop;for(prop in obj)if(obj.hasOwnProperty(prop)&&func(obj[prop],prop))break}function mixin(target,source,force){source&&eachProp(source,function(value,prop){if(force||!hasProp(target,prop))target[prop]=value})}function bind(obj,fn){return function(){return fn.apply(obj,arguments)}}function scripts(){return document.getElementsByTagName("script")}function getGlobal(value){if(!value)return value;var g=global;return each(value.split("."),function(part){g=g[part]}),g}function makeContextModuleFunc(func,relMap,enableBuildCallback){return function(){var args=aps.call(arguments,0),lastArg;return enableBuildCallback&&isFunction(lastArg=args[args.length-1])&&(lastArg.__requireJsBuild=!0),args.push(relMap),func.apply(null,args)}}function addRequireMethods(req,context,relMap){each([["toUrl"],["undef"],["defined","requireDefined"],["specified","requireSpecified"]],function(item){req[item[0]]=makeContextModuleFunc(context[item[1]||item[0]],relMap)})}function makeError(id,msg,err,requireModules){var e=new Error(msg+"\nhttp://requirejs.org/docs/errors.html#"+id);return e.requireType=id,e.requireModules=requireModules,err&&(e.originalError=err),e}function newContext(contextName){function trimDots(ary){var i,part;for(i=0;ary[i];i+=1){part=ary[i];if(part===".")ary.splice(i,1),i-=1;else if(part===".."){if(i===1&&(ary[2]===".."||ary[0]===".."))break;i>0&&(ary.splice(i-1,2),i-=2)}}}function normalize(name,baseName,applyMap){var baseParts=baseName&&baseName.split("/"),map=config.map,starMap=map&&map["*"],pkgName,pkgConfig,mapValue,nameParts,i,j,nameSegment,foundMap;name&&name.charAt(0)==="."&&(baseName?(config.pkgs[baseName]?baseParts=[baseName]:baseParts=baseParts.slice(0,baseParts.length-1),name=baseParts.concat(name.split("/")),trimDots(name),pkgConfig=config.pkgs[pkgName=name[0]],name=name.join("/"),pkgConfig&&name===pkgName+"/"+pkgConfig.main&&(name=pkgName)):name.indexOf("./")===0&&(name=name.substring(2)));if(applyMap&&(baseParts||starMap)&&map){nameParts=name.split("/");for(i=nameParts.length;i>0;i-=1){nameSegment=nameParts.slice(0,i).join("/");if(baseParts)for(j=baseParts.length;j>0;j-=1){mapValue=map[baseParts.slice(0,j).join("/")];if(mapValue){mapValue=mapValue[nameSegment];if(mapValue){foundMap=mapValue;break}}}!foundMap&&starMap&&starMap[nameSegment]&&(foundMap=starMap[nameSegment]);if(foundMap){nameParts.splice(0,i,foundMap),name=nameParts.join("/");break}}}return name}function removeScript(name){isBrowser&&each(scripts(),function(scriptNode){if(scriptNode.getAttribute("data-requiremodule")===name&&scriptNode.getAttribute("data-requirecontext")===context.contextName)return scriptNode.parentNode.removeChild(scriptNode),!0})}function hasPathFallback(id){var pathConfig=config.paths[id];if(pathConfig&&isArray(pathConfig)&&pathConfig.length>1)return removeScript(id),pathConfig.shift(),context.undef(id),context.require([id]),!0}function makeModuleMap(name,parentModuleMap,isNormalized,applyMap){var index=name?name.indexOf("!"):-1,prefix=null,parentName=parentModuleMap?parentModuleMap.name:null,originalName=name,isDefine=!0,normalizedName,url,pluginModule,suffix;return name||(isDefine=!1,name="_@r"+(requireCounter+=1)),index!==-1&&(prefix=name.substring(0,index),name=name.substring(index+1,name.length)),prefix&&(prefix=normalize(prefix,parentName,applyMap)),name&&(prefix?(pluginModule=defined[prefix],pluginModule&&pluginModule.normalize?normalizedName=pluginModule.normalize(name,function(name){return normalize(name,parentName,applyMap)}):normalizedName=normalize(name,parentName,applyMap)):(normalizedName=normalize(name,parentName,applyMap),url=urlMap[normalizedName],url||(url=context.nameToUrl(name,null,parentModuleMap),urlMap[normalizedName]=url))),suffix=prefix&&!pluginModule&&!isNormalized?"_unnormalized"+(unnormalizedCounter+=1):"",{prefix:prefix,name:normalizedName,parentMap:parentModuleMap,unnormalized:!!suffix,url:url,originalName:originalName,isDefine:isDefine,id:(prefix?prefix+"!"+(normalizedName||""):normalizedName)+suffix}}function getModule(depMap){var id=depMap.id,mod=registry[id];return mod||(mod=registry[id]=new context.Module(depMap)),mod}function on(depMap,name,fn){var id=depMap.id,mod=registry[id];hasProp(defined,id)&&(!mod||mod.defineEmitComplete)?name==="defined"&&fn(defined[id]):getModule(depMap).on(name,fn)}function onError(err,errback){var ids=err.requireModules,notified=!1;errback?errback(err):(each(ids,function(id){var mod=registry[id];mod&&(mod.error=err,mod.events.error&&(notified=!0,mod.emit("error",err)))}),notified||req.onError(err))}function takeGlobalQueue(){globalDefQueue.length&&(apsp.apply(defQueue,[defQueue.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function makeRequire(mod,enableBuildCallback,altRequire){var relMap=mod&&mod.map,modRequire=makeContextModuleFunc(altRequire||context.require,relMap,enableBuildCallback);return addRequireMethods(modRequire,context,relMap),modRequire}function removeWaiting(id){delete registry[id],each(waitAry,function(mod,i){if(mod.map.id===id)return waitAry.splice(i,1),mod.defined||(context.waitCount-=1),!0})}function findCycle(mod,traced){var id=mod.map.id,depArray=mod.depMaps,foundModule;if(!mod.inited)return;return traced[id]?mod:(traced[id]=!0,each(depArray,function(depMap){var depId=depMap.id,depMod=registry[depId];if(!depMod)return;return!depMod.inited||!depMod.enabled?(foundModule=null,delete traced[id],!0):foundModule=findCycle(depMod,traced)}),foundModule)}function forceExec(mod,traced,uninited){var id=mod.map.id,depArray=mod.depMaps;if(!mod.inited||!mod.map.isDefine)return;return traced[id]?defined[id]:(traced[id]=mod,each(depArray,function(depMap){var depId=depMap.id,depMod=registry[depId],value;if(handlers[depId])return;if(depMod){if(!depMod.inited||!depMod.enabled){uninited[id]=!0;return}value=forceExec(depMod,traced,uninited),uninited[depId]||mod.defineDepById(depId,value)}}),mod.check(!0),defined[id])}function modCheck(mod){mod.check()}function checkLoaded(){var waitInterval=config.waitSeconds*1e3,expired=waitInterval&&context.startTime+waitInterval<(new Date).getTime(),noLoads=[],stillLoading=!1,needCycleCheck=!0,map,modId,err,usingPathFallback;if(inCheckLoaded)return;inCheckLoaded=!0,eachProp(registry,function(mod){map=mod.map,modId=map.id;if(!mod.enabled)return;if(!mod.error)if(!mod.inited&&expired)hasPathFallback(modId)?(usingPathFallback=!0,stillLoading=!0):(noLoads.push(modId),removeScript(modId));else if(!mod.inited&&mod.fetched&&map.isDefine){stillLoading=!0;if(!map.prefix)return needCycleCheck=!1}});if(expired&&noLoads.length)return err=makeError("timeout","Load timeout for modules: "+noLoads,null,noLoads),err.contextName=context.contextName,onError(err);needCycleCheck&&(each(waitAry,function(mod){if(mod.defined)return;var cycleMod=findCycle(mod,{}),traced={};cycleMod&&(forceExec(cycleMod,traced,{}),eachProp(traced,modCheck))}),eachProp(registry,modCheck)),(!expired||usingPathFallback)&&stillLoading&&(isBrowser||isWebWorker)&&!checkLoadedTimeoutId&&(checkLoadedTimeoutId=setTimeout(function(){checkLoadedTimeoutId=0,checkLoaded()},50)),inCheckLoaded=!1}function callGetModule(args){getModule(makeModuleMap(args[0],null,!0)).init(args[1],args[2])}function removeListener(node,func,name,ieName){node.detachEvent&&!isOpera?ieName&&node.detachEvent(ieName,func):node.removeEventListener(name,func,!1)}function getScriptData(evt){var node=evt.currentTarget||evt.srcElement;return removeListener(node,context.onScriptLoad,"load","onreadystatechange"),removeListener(node,context.onScriptError,"error"),{node:node,id:node&&node.getAttribute("data-requiremodule")}}var config={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{}},registry={},undefEvents={},defQueue=[],defined={},urlMap={},urlFetched={},requireCounter=1,unnormalizedCounter=1,waitAry=[],inCheckLoaded,Module,context,handlers,checkLoadedTimeoutId;return handlers={require:function(mod){return makeRequire(mod)},exports:function(mod){mod.usingExports=!0;if(mod.map.isDefine)return mod.exports=defined[mod.map.id]={}},module:function(mod){return mod.module={id:mod.map.id,uri:mod.map.url,config:function(){return config.config&&config.config[mod.map.id]||{}},exports:defined[mod.map.id]}}},Module=function(map){this.events=undefEvents[map.id]||{},this.map=map,this.shim=config.shim[map.id],this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},Module.prototype={init:function(depMaps,factory,errback,options){options=options||{};if(this.inited)return;this.factory=factory,errback?this.on("error",errback):this.events.error&&(errback=bind(this,function(err){this.emit("error",err)})),each(depMaps,bind(this,function(depMap,i){typeof depMap=="string"&&(depMap=makeModuleMap(depMap,this.map.isDefine?this.map:this.map.parentMap,!1,!0),this.depMaps.push(depMap));var handler=handlers[depMap.id];if(handler){this.depExports[i]=handler(this);return}this.depCount+=1,on(depMap,"defined",bind(this,function(depExports){this.defineDep(i,depExports),this.check()})),errback&&on(depMap,"error",errback)})),this.inited=!0,this.ignore=options.ignore,options.enabled||this.enabled?this.enable():this.check()},defineDepById:function(id,depExports){var i;return each(this.depMaps,function(map,index){if(map.id===id)return i=index,!0}),this.defineDep(i,depExports)},defineDep:function(i,depExports){this.depMatched[i]||(this.depMatched[i]=!0,this.depCount-=1,this.depExports[i]=depExports)},fetch:function(){if(this.fetched)return;this.fetched=!0,context.startTime=(new Date).getTime();var map=this.map;map.prefix?this.callPlugin():this.shim?makeRequire(this,!0)(this.shim.deps||[],bind(this,function(){this.load()})):this.load()},load:function(){var url=this.map.url;urlFetched[url]||(urlFetched[url]=!0,context.load(this.map.id,url))},check:function(silent){if(!this.enabled)return;var id=this.map.id,depExports=this.depExports,exports=this.exports,factory=this.factory,err,cjsModule;if(!this.inited)this.fetch();else if(this.error)this.emit("error",this.error);else if(!this.defining){this.defining=!0;if(this.depCount<1&&!this.defined){if(isFunction(factory)){if(this.events.error)try{exports=context.execCb(id,factory,depExports,exports)}catch(e){err=e}else exports=context.execCb(id,factory,depExports,exports);this.map.isDefine&&(cjsModule=this.module,cjsModule&&cjsModule.exports!==undefined&&cjsModule.exports!==this.exports?exports=cjsModule.exports:exports===undefined&&this.usingExports&&(exports=this.exports));if(err)return err.requireMap=this.map,err.requireModules=[this.map.id],err.requireType="define",onError(this.error=err)}else exports=factory;this.exports=exports,this.map.isDefine&&!this.ignore&&(defined[id]=exports,req.onResourceLoad&&req.onResourceLoad(context,this.map,this.depMaps)),delete registry[id],this.defined=!0,context.waitCount-=1,context.waitCount===0&&(waitAry=[])}this.defining=!1,silent||this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}},callPlugin:function(){var map=this.map,id=map.id,pluginMap=makeModuleMap(map.prefix,null,!1,!0);on(pluginMap,"defined",bind(this,function(plugin){var name=this.map.name,parentName=this.map.parentMap?this.map.parentMap.name:null,load,normalizedMap,normalizedMod;if(this.map.unnormalized){plugin.normalize&&(name=plugin.normalize(name,function(name){return normalize(name,parentName,!0)})),normalizedMap=makeModuleMap(map.prefix+"!"+name),on(normalizedMap,"defined",bind(this,function(value){this.init([],function(){return value},null,{enabled:!0,ignore:!0})})),normalizedMod=registry[normalizedMap.id],normalizedMod&&(this.events.error&&normalizedMod.on("error",bind(this,function(err){this.emit("error",err)})),normalizedMod.enable());return}load=bind(this,function(value){this.init([],function(){return value},null,{enabled:!0})}),load.error=bind(this,function(err){this.inited=!0,this.error=err,err.requireModules=[id],eachProp(registry,function(mod){mod.map.id.indexOf(id+"_unnormalized")===0&&removeWaiting(mod.map.id)}),onError(err)}),load.fromText=function(moduleName,text){var hasInteractive=useInteractive;hasInteractive&&(useInteractive=!1),req.exec(text),hasInteractive&&(useInteractive=!0),context.completeLoad(moduleName)},plugin.load(map.name,makeRequire(map.parentMap,!0,function(deps,cb){return context.require(deps,cb)}),load,config)})),context.enable(pluginMap,this),this.pluginMaps[pluginMap.id]=pluginMap},enable:function(){this.enabled=!0,this.waitPushed||(waitAry.push(this),context.waitCount+=1,this.waitPushed=!0),each(this.depMaps,bind(this,function(map){var id=map.id,mod=registry[id];!handlers[id]&&mod&&!mod.enabled&&context.enable(map,this)})),eachProp(this.pluginMaps,bind(this,function(pluginMap){var mod=registry[pluginMap.id];mod&&!mod.enabled&&context.enable(pluginMap,this)})),this.check()},on:function(name,cb){var cbs=this.events[name];cbs||(cbs=this.events[name]=[]),cbs.push(cb)},emit:function(name,evt){each(this.events[name],function(cb){cb(evt)}),name==="error"&&delete this.events[name]}},context={config:config,contextName:contextName,registry:registry,defined:defined,urlMap:urlMap,urlFetched:urlFetched,waitCount:0,defQueue:defQueue,Module:Module,makeModuleMap:makeModuleMap,configure:function(cfg){cfg.baseUrl&&cfg.baseUrl.charAt(cfg.baseUrl.length-1)!=="/"&&(cfg.baseUrl+="/");var paths=config.paths,pkgs=config.pkgs,shim=config.shim,map=config.map||{};mixin(config,cfg,!0),mixin(paths,cfg.paths,!0),config.paths=paths,cfg.map&&(mixin(map,cfg.map,!0),config.map=map),cfg.shim&&(eachProp(cfg.shim,function(value,id){isArray(value)&&(value={deps:value}),value.exports&&!value.exports.__buildReady&&(value.exports=context.makeShimExports(value.exports)),shim[id]=value}),config.shim=shim),cfg.packages&&(each(cfg.packages,function(pkgObj){var location;pkgObj=typeof pkgObj=="string"?{name:pkgObj}:pkgObj,location=pkgObj.location,pkgs[pkgObj.name]={name:pkgObj.name,location:location||pkgObj.name,main:(pkgObj.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),config.pkgs=pkgs),(cfg.deps||cfg.callback)&&context.require(cfg.deps||[],cfg.callback)},makeShimExports:function(exports){var func;return typeof exports=="string"?(func=function(){return getGlobal(exports)},func.exports=exports,func):function(){return exports.apply(global,arguments)}},requireDefined:function(id,relMap){return hasProp(defined,makeModuleMap(id,relMap,!1,!0).id)},requireSpecified:function(id,relMap){return id=makeModuleMap(id,relMap,!1,!0).id,hasProp(defined,id)||hasProp(registry,id)},require:function(deps,callback,errback,relMap){var moduleName,id,map,requireMod,args;if(typeof deps=="string")return isFunction(callback)?onError(makeError("requireargs","Invalid require call"),errback):req.get?req.get(context,deps,callback):(moduleName=deps,relMap=callback,map=makeModuleMap(moduleName,relMap,!1,!0),id=map.id,hasProp(defined,id)?defined[id]:onError(makeError("notloaded",'Module name "'+id+'" has not been loaded yet for context: '+contextName)));errback&&!isFunction(errback)&&(relMap=errback,errback=undefined),callback&&!isFunction(callback)&&(relMap=callback,callback=undefined),takeGlobalQueue();while(defQueue.length){args=defQueue.shift();if(args[0]===null)return onError(makeError("mismatch","Mismatched anonymous define() module: "+args[args.length-1]));callGetModule(args)}return requireMod=getModule(makeModuleMap(null,relMap)),requireMod.init(deps,callback,errback,{enabled:!0}),checkLoaded(),context.require},undef:function(id){var map=makeModuleMap(id,null,!0),mod=registry[id];delete defined[id],delete urlMap[id],delete urlFetched[map.url],delete undefEvents[id],mod&&(mod.events.defined&&(undefEvents[id]=mod.events),removeWaiting(id))},enable:function(depMap,parent){var mod=registry[depMap.id];mod&&getModule(depMap).enable()},completeLoad:function(moduleName){var shim=config.shim[moduleName]||{},shExports=shim.exports&&shim.exports.exports,found,args,mod;takeGlobalQueue();while(defQueue.length){args=defQueue.shift();if(args[0]===null){args[0]=moduleName;if(found)break;found=!0}else args[0]===moduleName&&(found=!0);callGetModule(args)}mod=registry[moduleName];if(!found&&!defined[moduleName]&&mod&&!mod.inited){if(config.enforceDefine&&(!shExports||!getGlobal(shExports))){if(hasPathFallback(moduleName))return;return onError(makeError("nodefine","No define call for "+moduleName,null,[moduleName]))}callGetModule([moduleName,shim.deps||[],shim.exports])}checkLoaded()},toUrl:function(moduleNamePlusExt,relModuleMap){var index=moduleNamePlusExt.lastIndexOf("."),ext=null;return index!==-1&&(ext=moduleNamePlusExt.substring(index,moduleNamePlusExt.length),moduleNamePlusExt=moduleNamePlusExt.substring(0,index)),context.nameToUrl(moduleNamePlusExt,ext,relModuleMap)},nameToUrl:function(moduleName,ext,relModuleMap){var paths,pkgs,pkg,pkgPath,syms,i,parentModule,url,parentPath;moduleName=normalize(moduleName,relModuleMap&&relModuleMap.id,!0);if(req.jsExtRegExp.test(moduleName))url=moduleName+(ext||"");else{paths=config.paths,pkgs=config.pkgs,syms=moduleName.split("/");for(i=syms.length;i>0;i-=1){parentModule=syms.slice(0,i).join("/"),pkg=pkgs[parentModule],parentPath=paths[parentModule];if(parentPath){isArray(parentPath)&&(parentPath=parentPath[0]),syms.splice(0,i,parentPath);break}if(pkg){moduleName===pkg.name?pkgPath=pkg.location+"/"+pkg.main:pkgPath=pkg.location,syms.splice(0,i,pkgPath);break}}url=syms.join("/")+(ext||".js"),url=(url.charAt(0)==="/"||url.match(/^[\w\+\.\-]+:/)?"":config.baseUrl)+url}return config.urlArgs?url+((url.indexOf("?")===-1?"?":"&")+config.urlArgs):url},load:function(id,url){req.load(context,id,url)},execCb:function(name,callback,args,exports){return callback.apply(exports,args)},onScriptLoad:function(evt){if(evt.type==="load"||readyRegExp.test((evt.currentTarget||evt.srcElement).readyState)){interactiveScript=null;var data=getScriptData(evt);context.completeLoad(data.id)}},onScriptError:function(evt){var data=getScriptData(evt);if(!hasPathFallback(data.id))return onError(makeError("scripterror","Script error",evt,[data.id]))}}}function getInteractiveScript(){return interactiveScript&&interactiveScript.readyState==="interactive"?interactiveScript:(eachReverse(scripts(),function(script){if(script.readyState==="interactive")return interactiveScript=script}),interactiveScript)}var version="2.0.0",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,cjsRequireRegExp=/require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,ostring=Object.prototype.toString,ap=Array.prototype,aps=ap.slice,apsp=ap.splice,isBrowser=typeof window!="undefined"&&!!navigator&&!!document,isWebWorker=!isBrowser&&typeof importScripts!="undefined",readyRegExp=isBrowser&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera=typeof opera!="undefined"&&opera.toString()==="[object Opera]",contexts={},cfg={},globalDefQueue=[],useInteractive=!1,req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath;if(typeof define!="undefined")return;if(typeof requirejs!="undefined"){if(isFunction(requirejs))return;cfg=requirejs,requirejs=undefined}typeof require!="undefined"&&!isFunction(require)&&(cfg=require,require=undefined),req=requirejs=function(deps,callback,errback,optional){var contextName=defContextName,context,config;return!isArray(deps)&&typeof deps!="string"&&(config=deps,isArray(callback)?(deps=callback,callback=errback,errback=optional):deps=[]),config&&config.context&&(contextName=config.context),context=contexts[contextName],context||(context=contexts[contextName]=req.s.newContext(contextName)),config&&context.configure(config),context.require(deps,callback,errback)},req.config=function(config){return req(config)},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),addRequireMethods(req,contexts[defContextName]),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=function(err){throw err},req.load=function(context,moduleName,url){var config=context&&context.config||{},node;if(isBrowser)return node=config.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),node.type=config.scriptType||"text/javascript",node.charset="utf-8",node.setAttribute("data-requirecontext",context.contextName),node.setAttribute("data-requiremodule",moduleName),node.attachEvent&&!(node.attachEvent.toString&&node.attachEvent.toString().indexOf("[native code")<0)&&!isOpera?(useInteractive=!0,node.attachEvent("onreadystatechange",context.onScriptLoad)):(node.addEventListener("load",context.onScriptLoad,!1),node.addEventListener("error",context.onScriptError,!1)),node.src=url,currentlyAddingScript=node,baseElement?head.insertBefore(node,baseElement):head.appendChild(node),currentlyAddingScript=null,node;isWebWorker&&(importScripts(url),context.completeLoad(moduleName))},isBrowser&&eachReverse(scripts(),function(script){head||(head=script.parentNode),dataMain=script.getAttribute("data-main");if(dataMain)return cfg.baseUrl||(src=dataMain.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath,dataMain=mainScript.replace(jsSuffixRegExp,"")),cfg.deps=cfg.deps?cfg.deps.concat(dataMain):[dataMain],!0}),define=function(name,deps,callback){var node,context;typeof name!="string"&&(callback=deps,deps=name,name=null),isArray(deps)||(callback=deps,deps=[]),!deps.length&&isFunction(callback)&&callback.length&&(callback.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(match,dep){deps.push(dep)}),deps=(callback.length===1?["require"]:["require","exports","module"]).concat(deps)),useInteractive&&(node=currentlyAddingScript||getInteractiveScript(),node&&(name||(name=node.getAttribute("data-requiremodule")),context=contexts[node.getAttribute("data-requirecontext")])),(context?context.defQueue:globalDefQueue).push([name,deps,callback])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)})(this)