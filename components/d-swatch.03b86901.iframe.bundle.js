(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1799:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var docs_Swatchvue_type_script_lang_js_={props:{color:{type:String,default:"primary-text"},shadow:{type:String,default:void 0}},methods:{copy:function copy(){if(!this.shadow)return navigator.clipboard.writeText("$"+this.color),void this.$toast({title:"Copied color.",subtitle:"Color ".concat(this.color," was copied to the clipboard."),icon:"clipboard"});navigator.clipboard.writeText("$"+this.shadow),this.$toast({title:"Copied shadow.",subtitle:"shadow ".concat(this.color," was copied to the clipboard."),icon:"clipboard"})}}},componentNormalizer=(__webpack_require__(1832),__webpack_require__(19));const __vuedocgen_export_0=Object(componentNormalizer.a)(docs_Swatchvue_type_script_lang_js_,(function(){var _h=this.$createElement;return(this._self._c||_h)("div",{directives:[{name:"tooltip",rawName:"v-tooltip",value:this.shadow?this.shadow:this.color,expression:"shadow ? shadow : color"}],staticClass:"color-swatch",class:[this.color,this.shadow],on:{click:this.copy}},[this._v("\n  •\n")])}),[],!1,null,"b15f32fc",null).exports;__webpack_exports__.default=__vuedocgen_export_0;__vuedocgen_export_0.__docgenInfo={exportName:"default",displayName:"Swatch",description:"",tags:{},props:[{name:"color",type:{name:"string"},defaultValue:{func:!1,value:"'primary-text'"}},{name:"shadow",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}}]}},1811:function(module,exports,__webpack_require__){var content=__webpack_require__(1833);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);(0,__webpack_require__(45).default)("29a37d20",content,!0,{sourceMap:!1})},1832:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(1811)},1833:function(module,exports,__webpack_require__){var ___CSS_LOADER_EXPORT___=__webpack_require__(44)((function(i){return i[1]}));___CSS_LOADER_EXPORT___.push([module.i,".color-swatch[data-v-b15f32fc]{display:inline-block;width:4rem;height:4rem;border-radius:4rem;margin:1rem;box-shadow:0 8px 8px rgba(64,64,64,.06);display:inline-flex;align-items:center;justify-content:center;font-size:1.5rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.color-swatch.primary[data-v-b15f32fc]{background-color:var(--primary)}.color-swatch.primary-text[data-v-b15f32fc]{background-color:var(--primary-text)}.color-swatch.primary-fade[data-v-b15f32fc]{background-color:var(--primary-fade)}.color-swatch.primary-shade[data-v-b15f32fc]{background-color:var(--primary-shade)}.color-swatch.secondary[data-v-b15f32fc]{background-color:var(--secondary)}.color-swatch.secondary-text[data-v-b15f32fc]{background-color:var(--primary-text)}.color-swatch.secondary-fade[data-v-b15f32fc]{background-color:var(--secondary-fade)}.color-swatch.secondary-shade[data-v-b15f32fc]{background-color:var(--secondary-shade)}.color-swatch.error[data-v-b15f32fc]{background-color:var(--error)}.color-swatch.error-text[data-v-b15f32fc]{background-color:var(--error-text)}.color-swatch.error-fade[data-v-b15f32fc]{background-color:var(--error-fade)}.color-swatch.error-shade[data-v-b15f32fc]{background-color:var(--error-shade)}.color-swatch.warning[data-v-b15f32fc]{background-color:var(--warning)}.color-swatch.warning-text[data-v-b15f32fc]{background-color:var(--warning-text)}.color-swatch.warning-fade[data-v-b15f32fc]{background-color:var(--warning-fade)}.color-swatch.warning-shade[data-v-b15f32fc]{background-color:var(--warning-shade)}.color-swatch.dark[data-v-b15f32fc]{background-color:var(--dark)}.color-swatch.dark-fade[data-v-b15f32fc]{background-color:var(--dark-fade)}.color-swatch.dark-shade[data-v-b15f32fc]{background-color:var(--dark-shade)}.color-swatch.light[data-v-b15f32fc]{background-color:var(--light)}.color-swatch.light-fade[data-v-b15f32fc]{background-color:var(--light-fade)}.color-swatch.light-shade[data-v-b15f32fc]{background-color:var(--light-shade)}.color-swatch.shade-800[data-v-b15f32fc]{background-color:var(--shade-800)}.color-swatch.shade-700[data-v-b15f32fc]{background-color:var(--shade-700)}.color-swatch.shade-600[data-v-b15f32fc]{background-color:var(--shade-600)}.color-swatch.shade-500[data-v-b15f32fc]{background-color:var(--shade-500)}.color-swatch.shade-400[data-v-b15f32fc]{background-color:var(--shade-400)}.color-swatch.shade-300[data-v-b15f32fc]{background-color:var(--shade-300)}.color-swatch.shade-200[data-v-b15f32fc]{background-color:var(--shade-200)}.color-swatch.shade-100[data-v-b15f32fc]{background-color:var(--shade-100)}.color-swatch.primary[data-v-b15f32fc]{color:var(--primary-text,var(--text-color))}.color-swatch.primary-text[data-v-b15f32fc]{color:var(--primary,var(--text-color))}.color-swatch.primary-fade[data-v-b15f32fc]{color:var(--primary-fade-text,var(--text-color))}.color-swatch.primary-shade[data-v-b15f32fc]{color:var(--primary-shade-text,var(--text-color))}.color-swatch.secondary[data-v-b15f32fc]{color:var(--secondary-text,var(--text-color))}.color-swatch.secondary-text[data-v-b15f32fc]{color:var(--secondary,var(--text-color))}.color-swatch.secondary-fade[data-v-b15f32fc]{color:var(--secondary-fade-text,var(--text-color))}.color-swatch.secondary-shade[data-v-b15f32fc]{color:var(--secondary-shade-text,var(--text-color))}.color-swatch.error[data-v-b15f32fc]{color:var(--error-text,var(--text-color))}.color-swatch.error-text[data-v-b15f32fc]{color:var(--error,var(--text-color))}.color-swatch.error-fade[data-v-b15f32fc]{color:var(--error-fade-text,var(--text-color))}.color-swatch.error-shade[data-v-b15f32fc]{color:var(--error-shade-text,var(--text-color))}.color-swatch.warning[data-v-b15f32fc]{color:var(--warning-text,var(--text-color))}.color-swatch.warning-text[data-v-b15f32fc]{color:var(--warning,var(--text-color))}.color-swatch.warning-fade[data-v-b15f32fc]{color:var(--warning-fade-text,var(--text-color))}.color-swatch.warning-shade[data-v-b15f32fc]{color:var(--warning-shade-text,var(--text-color))}.color-swatch.dark[data-v-b15f32fc]{color:var(--dark-text,var(--text-color))}.color-swatch.dark-fade[data-v-b15f32fc]{color:var(--dark-fade-text,var(--text-color))}.color-swatch.dark-shade[data-v-b15f32fc]{color:var(--dark-shade-text,var(--text-color))}.color-swatch.light[data-v-b15f32fc]{color:var(--light-text,var(--text-color))}.color-swatch.light-fade[data-v-b15f32fc]{color:var(--light-fade-text,var(--text-color))}.color-swatch.light-shade[data-v-b15f32fc]{color:var(--light-shade-text,var(--text-color))}.color-swatch.shade-800[data-v-b15f32fc]{color:var(--shade-800-text,var(--background))}.color-swatch.shade-700[data-v-b15f32fc]{color:var(--shade-700-text,var(--background))}.color-swatch.shade-600[data-v-b15f32fc]{color:var(--shade-600-text,var(--background))}.color-swatch.shade-500[data-v-b15f32fc]{color:var(--shade-500-text,var(--background))}.color-swatch.shade-400[data-v-b15f32fc]{color:var(--shade-400-text,var(--background))}.color-swatch.shade-300[data-v-b15f32fc]{color:var(--shade-300-text,var(--text-color))}.color-swatch.shade-200[data-v-b15f32fc]{color:var(--shade-200-text,var(--text-color))}.color-swatch.shade-100[data-v-b15f32fc]{color:var(--shade-100-text,var(--text-color))}.color-swatch.drop-shadow[data-v-b15f32fc]{box-shadow:0 67px 205px rgba(64,64,64,.08),0 20px 61px rgba(64,64,64,.05),0 8px 25px rgba(64,64,64,.04),0 3px 10px rgba(64,64,64,.02)}.color-swatch.drop-shadow-small[data-v-b15f32fc]{box-shadow:0 8px 8px rgba(64,64,64,.06)}",""]),___CSS_LOADER_EXPORT___.locals={},module.exports=___CSS_LOADER_EXPORT___}}]);