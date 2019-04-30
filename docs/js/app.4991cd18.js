(function(t){function e(e){for(var n,i,o=e[0],c=e[1],u=e[2],d=0,h=[];d<o.length;d++)i=o[d],r[i]&&h.push(r[i][0]),r[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);l&&l(e);while(h.length)h.shift()();return s.push.apply(s,u||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(n=!1)}n&&(s.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},r={app:0},s=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1:function(t,e){},2:function(t,e){},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("097d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("header-navigation",{attrs:{canLearn:t.canLearn},on:{learn:t.startLearning,reset:t.reset}}),a("main",{attrs:{role:"main"}},[t.$store.state.dataset?a("div",{staticClass:"container data-container"},[t.isTraining?a("progress",{staticClass:"progress is-info progress_fixed",attrs:{max:"100"},domProps:{value:t.progress}},[t._v(t._s(t.progress))]):t._e(),a("data-table",{ref:"dataTable",on:{testRecord:t.testRecord,validationChange:function(e){t.canLearn=e}}}),t.currentNetwork?a("node-graph",{ref:"graph",attrs:{network:t.currentNetwork,record:t.testRecordData,predictions:t.predictions,error:t.predictionError},on:{recordChanged:t.recordChanged}}):t._e()],1):a("index-page-component")],1)],1)},s=[],i=(a("7f7f"),a("96cf"),a("1da1")),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"navbar is-fixed-top has-shadow",attrs:{role:"navigation","aria-label":"main navigation"}},[n("div",{staticClass:"container"},[n("div",{staticClass:"navbar-brand"},[n("a",{staticClass:"navbar-item"},[n("img",{attrs:{src:a("5dab")}}),t._v("\n                Neuro Buddy v-"+t._s(t.version)+"\n            ")]),t.$store.state.dataset?n("a",{staticClass:"navbar-burger burger",class:{"is-active":t.menuExpanded},attrs:{role:"button","aria-label":"menu","aria-expanded":"false","data-target":"navbar"},on:{click:function(e){t.menuExpanded=!t.menuExpanded}}},[n("span",{attrs:{"aria-hidden":"true"}}),n("span",{attrs:{"aria-hidden":"true"}}),n("span",{attrs:{"aria-hidden":"true"}})]):t._e()]),t.$store.state.dataset?n("div",{staticClass:"navbar-menu",class:{"is-active":t.menuExpanded},attrs:{id:"navbar"}},[n("div",{staticClass:"navbar-start"},[n("a",{staticClass:"navbar-item",attrs:{href:"#",type:"button"},on:{click:t.reset}},[t._m(0),n("span",{attrs:{href:"#"}},[t._v("Clear Dataset")])])]),n("div",{staticClass:"navbar-end"},[n("div",{staticClass:"navbar-item"},[n("div",{staticClass:"field is-grouped"},[n("button",{staticClass:"button is-primary",attrs:{type:"button",id:"submit-learn",disabled:!t.canLearn},on:{click:function(e){t.$emit("learn")}}},[t._v("Learn")])])])])]):t._e()])])},c=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon has-text-primary"},[n("img",{staticClass:"reset-icon",attrs:{src:a("fbb9")}})])}],u=a("9224"),l={name:"header-navigation",props:["canLearn"],data:function(){return{version:u["a"],menuExpanded:!0}},methods:{reset:function(){this.$emit("reset"),this.$store.dispatch("deleteDataset")}}},d=l,h=a("2877"),p=Object(h["a"])(d,o,c,!1,null,null,null);p.options.__file="HeaderNavigation.vue";var f=p.exports,v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.datasetHeaders.length?a("div",[a("div",{staticClass:"notification",class:{"is-primary":0===t.errors.length,"is-danger":t.errors.length>0}},[a("h3",[t._v("Current data is"+t._s(0===t.errors.length?" ":" not")+" ready to Learn")]),a("div",{staticClass:"content"},[t.errors.length?a("ul",{staticClass:"list-group"},t._l(t.errors,function(e,n){return a("li",{key:n},[t._v(t._s(e))])}),0):t._e()])]),a("div",{staticClass:"datatable"},[a("table",{staticClass:"table is-striped is-hoverable is-fullwidth"},[a("thead",[a("tr",t._l(t.datasetHeaders,function(e,n){return a("th",{key:n},[a("div",{staticClass:"control"},[a("label",{staticClass:"checkbox",attrs:{for:"use"+e.name}},[a("input",{attrs:{type:"checkbox",id:"use"+e.name},domProps:{checked:e.use},on:{change:function(a){t.$store.commit("setHeaderUsedMutation",{index:n,use:!e.use})}}}),t._v("\n                                "+t._s(e.name)+"\n                            ")])])])}),0),a("tr",t._l(t.datasetHeaders,function(e,n){return a("th",{key:n},[e.use?a("input-radio",{attrs:{items:t.inputTypes,value:e.isInput,name:e.name+"inType"},on:{change:function(e){t.$store.commit("setHeaderIsInputMutation",{index:n,isInput:e})}}}):t._e()],1)}),0),a("tr",t._l(t.datasetHeaders,function(e,n){return a("th",{key:n},[e.use?a("input-radio",{attrs:{items:t.valueTypes,value:e.isNumber,name:e.name+"valType"},on:{change:function(t){e.isNumber=t}}}):t._e()],1)}),0)]),a("tbody",t._l(t.currentDataset,function(e,n){return a("tr",{key:n,on:{click:function(a){t.$emit("testRecord",e)}}},t._l(e,function(e,n){return a("td",{key:n,class:{"has-text-grey-lighter":!t.datasetHeaders[n].use}},[t._v(t._s(e))])}),0)}),0)])]),a("nav",{staticClass:"pagination",attrs:{"aria-label":"Page navigation",role:"navigation"}},[t.hasPrevious?a("a",{staticClass:"pagination-previous",attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){e.preventDefault(),e.stopPropagation(),t.current--}}},[t._v("Previous")]):t._e(),t.hasNext?a("a",{staticClass:"pagination-next",attrs:{"aria-label":"Next"},on:{click:function(e){e.preventDefault(),e.stopPropagation(),t.current++}}},[t._v("Next")]):t._e(),a("ul",{staticClass:"pagination-list"},t._l(t.pageRegion,function(e,n){return a("li",{key:n},[a("a",{staticClass:"pagination-link",class:{"is-current":e===t.current},attrs:{href:"#"},on:{click:function(a){a.preventDefault(),a.stopPropagation(),t.current=e}}},[t._v(t._s(e+1))])])}),0)])]):t._e()},g=[],m=3e5,b=!0,_=!1,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"control"},t._l(t.items,function(e,n){return a("label",{key:e.label,staticClass:"radio",attrs:{for:t.name+n}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.current,expression:"current"}],attrs:{type:"radio",id:t.name+n,name:t.name},domProps:{value:e.value,checked:t._q(t.current,e.value)},on:{change:[function(a){t.current=e.value},function(a){t.$emit("change",e.value)}]}}),t._v("\n            "+t._s(e.label)+"\n        ")])}),0)])},w=[],k={props:{items:Array,value:Boolean,name:String},data:function(){return{current:this.value}}},x=k,C=Object(h["a"])(x,y,w,!1,null,null,null);C.options.__file="InputRadio.vue";var O=C.exports,j={components:{InputRadio:O},data:function(){return{current:0,valueTypes:[{label:"Numeric",value:!0},{label:"Label",value:!1}],inputTypes:[{label:"Input",value:b},{label:"Output",value:_}]}},computed:{datasetHeaders:function(){return this.$store.state.datasetHeaders},pages:function(){return this.$store.state.dataset?Math.floor(this.$store.state.dataset.length/10):0},errors:function(){var t=[],e=this.$store.getters.usedHeaders.filter(function(t){return t.isInput===b}).length;return 0===e&&t.push("Input node count cannot be 0"),e=this.$store.getters.usedHeaders.filter(function(t){return t.isInput===_}).length,0===e&&t.push("Output node count cannot be 0"),this.$emit("validationChange",0===t.length),t},pageRegion:function(){var t=Math.max(this.current-5,0),e=Math.min(t+11,this.pages);this.pages>10&&e-11<t&&(t=e-11);var a=[];a.length=e-t;for(var n=0;n<e-t;n++)a[n]=t+n;return a},hasNext:function(){return this.current<this.pages-1},hasPrevious:function(){return this.current>0},currentDataset:function(){var t=10*this.current+1;return this.$store.state.dataset.slice(t,t+10)}}},I=j,N=Object(h["a"])(I,v,g,!1,null,null,null);N.options.__file="DataTable.vue";var H=N.exports,T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box node-graph"},[a("table",[a("thead",[a("tr",[a("td",[t._v("Inputs")]),a("td",[t._v("Neural Network")]),a("td",[t._v("Outputs with Error "+t._s(Math.ceil(1e4*t.error)/100)+"%")])])]),a("tbody",[a("tr",[a("td",t._l(t.record,function(e,n){return a("div",{key:n,staticClass:"node-graph__row node-graph__row_right"},[a("div",{staticClass:"field is-horizontal"},[a("div",{staticClass:"field-label is-small"},[a("label",{staticClass:"label"},[t._v(t._s(e.name))])]),a("div",{staticClass:"field-body"},[a("div",{staticClass:"field"},[a("p",{staticClass:"control"},[a("input",{staticClass:"input",attrs:{type:"text",placeholder:"Text input",disabled:""},domProps:{value:e.value},on:{input:function(e){t.$emit("recordChanged",{index:n,value:e.target.value})}}})])])])])])}),0),a("td",[a("canvas",{ref:"canvas"},[t._v("Your browser does not support the HTML5 canvas tag.")])]),a("td",t._l(t.predictions,function(e,n){return a("div",{key:n,staticClass:"node-graph__row node-graph__row_left"},[e instanceof Object?a("span",{style:{opacity:t.valueOpacity(e.value)}},[t._v("\n                            "+t._s(e.key)+":\n                            "+t._s(Math.ceil(1e3*e.value)/1e3)+"\n                        ")]):a("span",[t._v(t._s(Math.ceil(1e3*e)/1e3))])])}),0)])])])])},$=[],E=(a("6c7b"),a("ac6a"),a("c5f6"),2*Math.PI),D=20,M=100,P={props:{network:Object,predictions:Array,error:Number,record:Array},data:function(){return{ctx:null}},mounted:function(){this.ctx=this.$refs.canvas.getContext("2d"),this.calculateDimensions(),this.drawNetwork()},watch:{network:function(){this.calculateDimensions(),this.drawNetwork()}},methods:{calculateDimensions:function(){var t=0;this.network.net.m_layers.forEach(function(e){t=Math.max(t,e.length)}),this.$refs.canvas.width=this.network.net.m_layers.length*M,this.$refs.canvas.height=this.yCoord(t)},drawNetwork:function(){var t=this;this.ctx.clearRect(0,0,this.$refs.canvas.width,this.$refs.canvas.height),this.network.net.m_layers.forEach(function(e,a){t.drawLayer(e,a,t.network.net.m_layers[a+1])})},drawLayer:function(t,e,a){var n=this,r=0,s=0,i=0;t.forEach(function(t,o){r=2*D+e*M,s=n.yCoord(o),n.ctx.beginPath(),n.ctx.arc(r,s,D,0,E),n.ctx.fillStyle="#00d1b2",n.ctx.fill(),a&&(r+=D,i=(e+1)*M+D,n.ctx.lineWidth=2,t.m_outputWeights.forEach(function(t,e){n.ctx.beginPath(),n.ctx.moveTo(r,s),n.ctx.lineTo(i,n.yCoord(e)),n.ctx.strokeStyle=n.weigthColor(t.w),n.ctx.stroke()}))})},yCoord:function(t){return(2*D+10)*t+D},weigthColor:function(t){var e=Math.floor(255*(t+1));return"rgb(".concat(e,", ").concat(e/2,", 0)")},valueOpacity:function(t){return Math.max(.3,t)}}},R=P,L=Object(h["a"])(R,T,$,!1,null,null,null);L.options.__file="NodeGraph.vue";var z=L.exports,V=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("section",{staticClass:"hero is-small is-dark is-bold"},[n("div",{staticClass:"container"},[n("div",{staticClass:"hero-body has-text-centered"},[n("img",{staticClass:"hero-brain",attrs:{src:a("ccc9"),alt:"Teach your model"}}),n("h1",{staticClass:"title"},[t._v("Neuro Buddy")]),n("h2",{staticClass:"subtitle"},[t._v("Artificial Intelligence fundamentals with a simplified Neural Network dashboard.")]),n("div",{staticClass:"field",attrs:{id:"upload_field"}},[n("div",{ref:"fileDrop",staticClass:"file is-large is-centered"},[n("label",{staticClass:"file-label"},[n("input",{staticClass:"file-input",attrs:{type:"file",name:"resume"},on:{change:t.onFileInput}}),t._m(0)])])])])])]),t._m(1)])},A=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"file-cta"},[n("span",{staticClass:"file-icon"},[n("img",{attrs:{src:a("c118")}})]),n("span",{staticClass:"file-label"},[t._v("\n                                    Upload Your  \n                                    "),n("b",[t._v("CSV data")]),t._v(",\n                                ")]),n("span",{staticClass:"file-label"},[t._v("300 KB MAX")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("section",{staticClass:"section"},[n("h1",{staticClass:"title is-1"},[t._v("About")]),n("p",[t._v("\n                What is\n                "),n("b",[t._v("Machine learning")]),t._v(", what is\n                "),n("b",[t._v("Neural Network")]),t._v("?\n            ")]),n("p",[t._v("These days we hear all about face recognition technologies, or impressive Artificial intelligence for dog and human like robots. So is is hard to understand how all of it really works.")]),n("p",[t._v("\n                Most of current\n                "),n("b",[t._v("Machine learning")]),t._v(" tutorials are also centered around coding in\n                "),n("a",{attrs:{rel:"nofollow",href:"https://www.python.org/"}},[t._v("python")]),t._v(" and specifically\n                "),n("a",{attrs:{rel:"nofollow",href:"https://www.numpy.org/"}},[t._v("numpy")]),t._v(" which is the preferred way. But how can a beginner learn and use it to it immediately and understand data all together?\n            ")]),n("p",[n("b",[t._v("This")]),t._v(" project is aimed to teach beginners such as\n                "),n("b",[t._v("myself")]),t._v(" to quickly grasp the main aspect of Machine learning -\n                "),n("b",[t._v("Data")]),t._v(". The data that you feel is important and want to make decisions on.\n            ")]),n("br"),n("h4",{staticClass:"title is-4"},[t._v("The Data")]),n("p",[t._v("So to start off you have to decide the area you want to learn about and make proper predictions on.")]),n("p",[t._v("\n                You will have to understand the area/topic of interest. Just to have a proof of concept lets have the\n                "),n("b",[t._v("following example")]),t._v(".\n            ")]),n("p",[t._v("\n                The traditional data set to train on is\n                "),n("a",{attrs:{rel:"nofollow",href:"https://en.wikipedia.org/wiki/Iris_flower_data_set"}},[t._v("Iris flower data set")]),t._v(". Its relevant data is available in CSV format\n                "),n("a",{attrs:{rel:"nofollow",href:"/test-data/iris.csv"}},[t._v("Here")]),t._v(" (right click and download).\n            ")]),n("p",[t._v("\n                Please make sure that you\n                "),n("b",[t._v("\n                    data file\n                    starts with\n                ")]),t._v(" defining\n                "),n("b",[t._v("column headers")]),t._v(".\n            ")]),n("p",[t._v("Please get inspired by following data sources:")]),n("div",{staticClass:"content"},[n("ul",[n("li",[n("a",{attrs:{rel:"nofollow",href:"https://machinelearningmastery.com/standard-machine-learning-datasets/"}},[t._v("machinelearningmastery.com")])]),n("li",[n("a",{attrs:{rel:"nofollow",href:"https://www.kaggle.com/datasets"}},[t._v("kaggle.com")])])])]),n("br"),n("h4",{staticClass:"title is-4"},[t._v("The Learning")]),n("p",[t._v("\n                Once the data set is decided, it's time to put it to test.\n                "),n("a",{attrs:{href:"#upload_field"}},[t._v("Upload the csv by dropping it on the box")]),t._v(" waay up - here we'll use the\n                "),n("a",{attrs:{rel:"nofollow",href:"/test-data/iris.csv"}},[t._v("Iris CSV")]),t._v(". On the new screen you will see CSVs data, and notice that in the presented table you should select specific coulumns as\n                "),n("b",[t._v("output/label")]),t._v(" as displayed below.\n            ")]),n("br"),n("img",{staticClass:"box",attrs:{src:a("fb50"),alt:"Select data inputs/outputs"}}),n("br"),n("p",[t._v("\n                Now when the data is setup, press\n                "),n("b",[t._v('"Learn"')]),t._v("\n                button in top right corner. This will only have a few learning steps done in the background.\n                "),n("br"),t._v("At this point you can observe the Graph below the Table, and already test the Neural Network by clicking on any Tables record and see if the output/prediction is anyway similar to expected output.\n                "),n("br"),t._v("If current prediction is off, then keep clicking that\n                "),n("b",[t._v('"Learn"')]),t._v(" button and test outputs, also observing as Prediction error decreases (hopefully).\n            ")])])])}],S={mounted:function(){var t=this.$refs.fileDrop;this.dragAndDropCapable=this.isDragAndDropCapable(),this.dragAndDropCapable&&(["drag","dragstart","dragend","dragover","dragenter","dragleave","drop"].forEach(function(t){document.body.addEventListener(t,function(t){t.preventDefault(),t.stopPropagation()})}),t.addEventListener("drop",this.dropEvent))},beforeDestroy:function(){this.$refs.fileDrop.removeEventListener("drop",this.dropEvent)},methods:{dropEvent:function(t){var e=t.target.files||t.dataTransfer.files;e.length&&this.onFileChanged(e[0])},onFileInput:function(t){t.target.files&&this.onFileChanged(t.target.files[0])},onFileChanged:function(t){"text/csv"===t.type&&this.$store.dispatch("createDatasetFromFile",t)},isDragAndDropCapable:function(){var t=this.$refs.fileDrop;return("draggable"in t||"ondragstart"in t&&"ondrop"in t)&&"FormData"in window&&"FileReader"in window}}},F=S,B=Object(h["a"])(F,V,A,!1,null,null,null);B.options.__file="IndexPage.vue";var Y=B.exports,G=a("2909"),U=a("d4ec"),J=a("bee2"),W=a("ade3"),q=a("6abd"),K=(a("456d"),function(t,e,a){return(t-e)/(a-e)}),X=function(t,e,a){return t*(a-e)+e},Q=function(t,e,a){return 2*K(t,e,a)-1},Z=function(t,e,a){return(X(t,e,a)+1)/2},tt=function(){function t(){Object(U["a"])(this,t),Object(W["a"])(this,"min",Number.POSITIVE_INFINITY),Object(W["a"])(this,"max",Number.NEGATIVE_INFINITY),Object(W["a"])(this,"length",1),Object(W["a"])(this,"isLabel",!1)}return Object(J["a"])(t,[{key:"addItem",value:function(t){var e=Number(t);this.min=Math.min(this.min,e),this.max=Math.max(this.max,e)}},{key:"normalize",value:function(t){return Q(Number(t),this.min,this.max)}},{key:"revert",value:function(t){return Z(t,this.min,this.max)}},{key:"preprocess",value:function(){}}]),t}(),et=function(){function t(){var e=this;Object(U["a"])(this,t),Object(W["a"])(this,"keys",[]),Object(W["a"])(this,"vectors",{}),Object(W["a"])(this,"length",0),Object(W["a"])(this,"isLabel",!0),Object(W["a"])(this,"revert",function(t){return e.keys.map(function(e,a){return{key:e,value:t[a]}})})}return Object(J["a"])(t,[{key:"addItem",value:function(t){this.vectors[t]||(this.vectors[t]=[])}},{key:"normalize",value:function(t){return this.vectors[t]}},{key:"preprocess",value:function(){var t=this;this.keys=Object.keys(this.vectors),this.length=this.keys.length,this.keys.forEach(function(e,a){t.vectors[e]=Array(t.length).fill(0),t.vectors[e][a]=1})}}]),t}(),at=function t(e,a){Object(U["a"])(this,t),Object(W["a"])(this,"normalization",void 0),this.index=a,this.normalization=!0===e?new tt:new et},nt=function(){function t(e,a){var n,r=this;Object(U["a"])(this,t),Object(W["a"])(this,"net",void 0),Object(W["a"])(this,"inputVals",[]),Object(W["a"])(this,"outputVals",[]),Object(W["a"])(this,"dataset",[]),Object(W["a"])(this,"inputHeaders",[]),Object(W["a"])(this,"outputHeaders",[]),Object(W["a"])(this,"chunks",[]),this.dataset=e,a.forEach(function(t){n=new at(t.isNumber,t.index),t.isInput===b?r.inputHeaders.push(n):r.outputHeaders.push(n)}),this.normalize(),this.setup()}return Object(J["a"])(t,[{key:"setup",value:function(){this.net=new q["NeuralNet"],this.inputVals.length=this.headerInputCount(this.inputHeaders),this.outputVals.length=this.headerInputCount(this.outputHeaders);var t=this.inputVals.length+this.outputVals.length,e=Math.ceil(2*t/3);if(!this.inputHeaders.length||!this.outputHeaders.length)throw"Invalid data";var a=[this.inputVals.length,e,this.outputVals.length];this.net.setTopology(a,q["transferFunction"].tangent)}},{key:"headerInputCount",value:function(t){return t.reduce(function(t,e){return e.normalization.preprocess(),t+e.normalization.length},0)}},{key:"normalize",value:function(){for(var t=this,e=function(e){var a=t.dataset[e];t.inputHeaders.forEach(function(t){t.normalization.addItem(a[t.index])}),t.outputHeaders.forEach(function(t){t.normalization.addItem(a[t.index])})},a=1;a<this.dataset.length-1;a++)e(a)}},{key:"train",value:function(t){var e=this;return new Promise(function(){var a=Object(i["a"])(regeneratorRuntime.mark(function a(n){var r,s,i,o,c,u,l;return regeneratorRuntime.wrap(function(a){while(1)switch(a.prev=a.next){case 0:if(!e.chunks.length){r=1,s=0,i=150;while(r<e.dataset.length-1)s=Math.min(r+i,e.dataset.length-1),e.chunks.push({start:r,end:s}),r+=i}o=5,c=e.chunks.length*o,u=0;case 4:if(!(u<o)){a.next=16;break}l=0;case 6:if(!(l<e.chunks.length)){a.next=13;break}return a.next=9,e.processChunk(e.chunks[l]);case 9:t(Math.ceil((u*e.chunks.length+l)/c*100));case 10:l++,a.next=6;break;case 13:u++,a.next=4;break;case 16:n();case 17:case"end":return a.stop()}},a,this)}));return function(t){return a.apply(this,arguments)}}())}},{key:"processChunk",value:function(t){var e=this;return new Promise(function(a){for(var n=t.start;n<t.end;n++)e.processRecord(e.dataset[n]),e.net.backProp(e.outputVals);setTimeout(function(){a()},50)})}},{key:"processRecord",value:function(t){this.recordToHeaders(t,this.inputHeaders,this.inputVals),this.recordToHeaders(t,this.outputHeaders,this.outputVals),this.net.feedForward(this.inputVals)}},{key:"recordToHeaders",value:function(t,e,a){var n,r=0;e.forEach(function(e){n=e.normalization.normalize(t[e.index]),e.normalization.isLabel?a.splice.apply(a,[r,e.normalization.length].concat(Object(G["a"])(n))):a.splice(r,e.normalization.length,n),r+=e.normalization.length})}},{key:"predictRecord",value:function(t){this.processRecord(t);var e,a=this.net.getResults(),n=[],r=0;return this.outputHeaders.forEach(function(t){e=a.slice(r,r+t.normalization.length),r+=t.normalization.length;var s=t.normalization.revert(e);s instanceof Array?n.push.apply(n,Object(G["a"])(s)):n.push(s)}),{results:n,error:this.net.getRecentAverageError()}}}]),t}(),rt={name:"app",components:{HeaderNavigation:f,DataTable:H,NodeGraph:z,IndexPageComponent:Y},data:function(){return{progress:0,isTraining:!1,canLearn:!1,predictions:[],predictionError:0,testRecordData:[],tempRecord:[]}},computed:{currentNetwork:function(){try{return new nt(this.$store.state.dataset,this.$store.getters.usedHeaders)}catch(t){return null}}},methods:{reset:function(){this.isTraining=!1,this.predictions=[],this.predictionError=0,this.testRecordData=[]},startLearning:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.canLearn&&!this.isTraining){t.next=2;break}return t.abrupt("return");case 2:return this.isTraining=!0,this.progress=0,t.next=6,this.currentNetwork.train(function(t){e.progress=t});case 6:this.isTraining=!1,this.$refs.graph.drawNetwork();case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),testRecord:function(t){this.tempRecord=t;var e=this.currentNetwork.predictRecord(t),a=e.results,n=e.error;this.predictions=a,this.predictionError=n,this.testRecordData=this.$store.getters.usedHeaders.reduce(function(e,a){return a.isInput===b&&e.push({name:a.name,value:t[a.index]}),e},[])},recordChanged:function(t){}}},st=rt,it=Object(h["a"])(st,r,s,!1,null,null,null);it.options.__file="App.vue";var ot=it.exports,ct=a("2f62"),ut=a("e196"),lt=a.n(ut),dt=function t(e,a,n,r,s){Object(U["a"])(this,t),this.name=e,this.use=a,this.isInput=n,this.isNumber=r,this.index=s};n["a"].use(ct["a"]);var ht=new ct["a"].Store({state:{dataset:void 0,datasetHeaders:void 0},getters:{usedHeaders:function(t){return t.datasetHeaders.filter(function(t){return!0===t.use})}},mutations:{setDatasetMutation:function(t,e){var a=e.data,n=e.headers;t.dataset=a,t.datasetHeaders=n},setHeaderIsInputMutation:function(t,e){var a=e.index,n=e.isInput;t.datasetHeaders[a].isInput=n},setHeaderUsedMutation:function(t,e){var a=e.index,n=e.use;t.datasetHeaders[a].use=n}},actions:{deleteDataset:function(t){var e=t.commit;e("setDatasetMutation",{data:void 0,datasetHeaders:void 0})},createDatasetFromFile:function(t,e){var a=t.commit;return new Promise(function(t,n){if(!e||e.size>m)return n();lt.a.parse(e,{complete:function(e){a("setDatasetMutation",{data:e.data,headers:pt(e.data)}),t()}})})}}}),pt=function(t){return t[0].map(function(t,e){return new dt(t,!0,b,!0,e)})};a("eb46");n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(ot)},store:ht}).$mount("#app")},"5dab":function(t,e,a){t.exports=a.p+"img/header-logo.dadcb3c5.png"},9224:function(t){t.exports={a:"0.1.0"}},c118:function(t,e,a){t.exports=a.p+"img/upload.14dd1331.svg"},ccc9:function(t,e,a){t.exports=a.p+"img/brain-logo.7c402b2e.png"},fb50:function(t,e,a){t.exports=a.p+"img/tut1.b0993056.png"},fbb9:function(t,e,a){t.exports=a.p+"img/rotate-ccw.7260812b.svg"}});
//# sourceMappingURL=app.4991cd18.js.map