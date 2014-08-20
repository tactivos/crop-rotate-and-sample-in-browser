(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BinaryFile=module.exports=function(t,e,n){var r=t,i=e||0,o=0;this.getRawData=function(){return r},"string"==typeof t?(o=n||r.length,this.getByteAt=function(t){return 255&r.charCodeAt(t+i)},this.getBytesAt=function(t,e){for(var n=[],o=0;e>o;o++)n[o]=255&r.charCodeAt(t+o+i);return n}):"unknown"==typeof t&&(o=n||IEBinary_getLength(r),this.getByteAt=function(t){return IEBinary_getByteAt(r,t+i)},this.getBytesAt=function(t,e){return new VBArray(IEBinary_getBytesAt(r,t+i,e)).toArray()}),this.getLength=function(){return o},this.getSByteAt=function(t){var e=this.getByteAt(t);return e>127?e-256:e},this.getShortAt=function(t,e){var n=e?(this.getByteAt(t)<<8)+this.getByteAt(t+1):(this.getByteAt(t+1)<<8)+this.getByteAt(t);return 0>n&&(n+=65536),n},this.getSShortAt=function(t,e){var n=this.getShortAt(t,e);return n>32767?n-65536:n},this.getLongAt=function(t,e){var n=this.getByteAt(t),r=this.getByteAt(t+1),i=this.getByteAt(t+2),o=this.getByteAt(t+3),g=e?(((n<<8)+r<<8)+i<<8)+o:(((o<<8)+i<<8)+r<<8)+n;return 0>g&&(g+=4294967296),g},this.getSLongAt=function(t,e){var n=this.getLongAt(t,e);return n>2147483647?n-4294967296:n},this.getStringAt=function(t,e){for(var n=[],r=this.getBytesAt(t,e),i=0;e>i;i++)n[i]=String.fromCharCode(r[i]);return n.join("")},this.getCharAt=function(t){return String.fromCharCode(this.getByteAt(t))},this.toBase64=function(){return window.btoa(r)},this.fromBase64=function(t){r=window.atob(t)}};
},{}],2:[function(require,module,exports){
module.exports=function(n){var e=(window.HTMLCanvasElement&&window.HTMLCanvasElement.prototype,window.Blob&&function(){try{return Boolean(new Blob)}catch(n){return!1}}()),o=e&&window.Uint8Array&&function(){try{return 100===new Blob([new Uint8Array(100)]).size}catch(n){return!1}}(),r=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,t=(e||r)&&window.atob&&window.ArrayBuffer&&window.Uint8Array&&function(n){var t,i,w,l,d,a;for(t=n.split(",")[0].indexOf("base64")>=0?atob(n.split(",")[1]):decodeURIComponent(n.split(",")[1]),i=new ArrayBuffer(t.length),w=new Uint8Array(i),l=0;l<t.length;l+=1)w[l]=t.charCodeAt(l);return d=n.split(",")[0].split(":")[1].split(";")[0],e?new Blob([o?w:i],{type:d}):(a=new r,a.append(i),a.getBlob(d))};return t(n)};
},{}],3:[function(require,module,exports){
var EXIF=module.exports=function(){function e(e){return!!e.exifdata}function t(e,t){function o(o){var n=r(o);e.exifdata=n||{},t&&t.call(e)}if(e instanceof Image)BinaryAjax(e.src,function(e){o(e.binaryResponse)});else if(window.FileReader&&e instanceof window.File){var n=new FileReader;n.onload=function(e){o(new BinaryFile(e.target.result))},n.readAsBinaryString(e)}}function r(e){if(255!=e.getByteAt(0)||216!=e.getByteAt(1))return!1;for(var t,r=2,o=e.getLength();o>r;){if(255!=e.getByteAt(r))return c&&console.log("Not a valid marker at offset "+r+", found: "+e.getByteAt(r)),!1;if(t=e.getByteAt(r+1),22400==t)return c&&console.log("Found 0xFFE1 marker"),i(e,r+4,e.getShortAt(r+2,!0)-2);if(225==t)return c&&console.log("Found 0xFFE1 marker"),i(e,r+4,e.getShortAt(r+2,!0)-2);r+=2+e.getShortAt(r+2,!0)}}function o(e,t,r,o,i){var a,s,u,l=e.getShortAt(r,i),d={};for(u=0;l>u;u++)a=r+12*u+2,s=o[e.getShortAt(a,i)],!s&&c&&console.log("Unknown tag: "+e.getShortAt(a,i)),d[s]=n(e,a,t,r,i);return d}function n(e,t,r,o,n){var i,a,s,u,l,d,c=e.getShortAt(t+2,n),g=e.getLongAt(t+4,n),f=e.getLongAt(t+8,n)+r;switch(c){case 1:case 7:if(1==g)return e.getByteAt(t+8,n);for(i=g>4?f:t+8,a=[],u=0;g>u;u++)a[u]=e.getByteAt(i+u);return a;case 2:return i=g>4?f:t+8,e.getStringAt(i,g-1);case 3:if(1==g)return e.getShortAt(t+8,n);for(i=g>2?f:t+8,a=[],u=0;g>u;u++)a[u]=e.getShortAt(i+2*u,n);return a;case 4:if(1==g)return e.getLongAt(t+8,n);a=[];for(var u=0;g>u;u++)a[u]=e.getLongAt(f+4*u,n);return a;case 5:if(1==g)return l=e.getLongAt(f,n),d=e.getLongAt(f+4,n),s=new Number(l/d),s.numerator=l,s.denominator=d,s;for(a=[],u=0;g>u;u++)l=e.getLongAt(f+8*u,n),d=e.getLongAt(f+4+8*u,n),a[u]=new Number(l/d),a[u].numerator=l,a[u].denominator=d;return a;case 9:if(1==g)return e.getSLongAt(t+8,n);for(a=[],u=0;g>u;u++)a[u]=e.getSLongAt(f+4*u,n);return a;case 10:if(1==g)return e.getSLongAt(f,n)/e.getSLongAt(f+4,n);for(a=[],u=0;g>u;u++)a[u]=e.getSLongAt(f+8*u,n)/e.getSLongAt(f+4+8*u,n);return a}}function i(e,t){if("Exif"!=e.getStringAt(t,4))return c&&console.log("Not valid EXIF data! "+e.getStringAt(t,4)),!1;var r,n,i,a,s,u=t+6;if(18761==e.getShortAt(u))r=!1;else{if(19789!=e.getShortAt(u))return c&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;r=!0}if(42!=e.getShortAt(u+2,r))return c&&console.log("Not valid TIFF data! (no 0x002A)"),!1;if(8!=e.getLongAt(u+4,r))return c&&console.log("Not valid TIFF data! (First offset not 8)",e.getShortAt(u+4,r)),!1;if(n=o(e,u,u+8,f,r),n.ExifIFDPointer){a=o(e,u,u+n.ExifIFDPointer,g,r);for(i in a){switch(i){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":a[i]=h[i][a[i]];break;case"ExifVersion":case"FlashpixVersion":a[i]=String.fromCharCode(a[i][0],a[i][1],a[i][2],a[i][3]);break;case"ComponentsConfiguration":a[i]=h.Components[a[i][0]]+h.Components[a[i][1]]+h.Components[a[i][2]]+h.Components[a[i][3]]}n[i]=a[i]}}if(n.GPSInfoIFDPointer){s=o(e,u,u+n.GPSInfoIFDPointer,S,r);for(i in s){switch(i){case"GPSVersionID":s[i]=s[i][0]+"."+s[i][1]+"."+s[i][2]+"."+s[i][3]}n[i]=s[i]}}return n}function a(r,o){return r instanceof Image&&!r.complete?!1:(e(r)?o&&o.call(r):t(r,o),!0)}function s(t,r){return e(t)?t.exifdata[r]:void 0}function u(t){if(!e(t))return{};var r,o=t.exifdata,n={};for(r in o)o.hasOwnProperty(r)&&(n[r]=o[r]);return n}function l(t){if(!e(t))return"";var r,o=t.exifdata,n="";for(r in o)o.hasOwnProperty(r)&&(n+="object"==typeof o[r]?o[r]instanceof Number?r+" : "+o[r]+" ["+o[r].numerator+"/"+o[r].denominator+"]\r\n":r+" : ["+o[r].length+" values]\r\n":r+" : "+o[r]+"\r\n");return n}function d(e){return r(e)}var c=!1,g={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},f={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},S={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},h={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}};return{readFromBinaryFile:d,pretty:l,getTag:s,getAllTags:u,getData:a,Tags:g,TiffTags:f,GPSTags:S,StringValues:h}}();
},{}],4:[function(require,module,exports){
var EXIF=require("./exif"),BinaryFile=require("./binaryFile"),toBlob=require("./canvas-to-blob");module.exports=window.ImageMethods={xhrUpload:function(t,e,a,n,r){var i=toBlob(e.toDataURL());r||(r=function(){});var o=new FormData;for(var g in n)o.append(g,n[g]);o.append("file",i,a);var h=new XMLHttpRequest;h.open("POST",t,!0),h.onload=function(){r()},h.onerror=function(t){r(t)},h.send(o)},rotate:function(t,e){var a=document.createElement("canvas"),n=a.getContext("2d");return 90==e||270==e?(a.width=t.height,a.height=t.width):(a.width=t.width,a.height=t.height),n.save(),90==e||270==e?n.translate(t.height/2,t.width/2):n.translate(t.width/2,t.height/2),n.rotate(e*Math.PI/180),n.drawImage(t,-t.width/2,-t.height/2),n.restore(),a},crop:function(t,e,a,n,r){var i=document.createElement("canvas");i.width=n,i.height=r;var o=t.getContext("2d").getImageData(e,a,n,r);return i.getContext("2d").putImageData(o,0,0),i},resize:function(t,e,a){var n=t.width,r=t.height,i=document.createElement("canvas");i.width=e,i.height=a;for(var o=(Date.now(),t.getContext("2d").getImageData(0,0,n,r)),g=i.getContext("2d").getImageData(0,0,e,a),h=o.data,d=g.data,c=n/e,l=r/a,u=Math.ceil(c/2),s=Math.ceil(l/2),v=0;a>v;v++)for(var f=0;e>f;f++){for(var m=4*(f+v*e),w=0,x=0,p=0,b=gx_g=gx_b=gx_a=0,F=(v+.5)*l,I=Math.floor(v*l);(v+1)*l>I;I++)for(var M=Math.abs(F-(I+.5))/s,D=(f+.5)*c,_=M*M,B=Math.floor(f*c);(f+1)*c>B;B++){var C=Math.abs(D-(B+.5))/u,E=Math.sqrt(_+C*C);E>=-1&&1>=E&&(w=2*E*E*E-3*E*E+1,w>0&&(C=4*(B+I*n),gx_a+=w*h[C+3],p+=w,h[C+3]<255&&(w=w*h[C+3]/250),b+=w*h[C],gx_g+=w*h[C+1],gx_b+=w*h[C+2],x+=w))}d[m]=b/x,d[m+1]=gx_g/x,d[m+2]=gx_b/x,d[m+3]=gx_a/p}return i.getContext("2d").putImageData(g,0,0),i},parseFile:function(t,e){e||(e=function(){});var a,n,r,i=0,o=function(){if(i++,!(2>i)){var t=document.createElement("canvas"),o=t.getContext("2d");t.width=r.width,t.height=r.height,o.drawImage(r,0,0),e(t,r,n,a)}},g=new FileReader;g.readAsDataURL(t);var h=new FileReader;h.readAsBinaryString?(h.readAsBinaryString(t),h.onload=function(t){var e=new BinaryFile(t.target.result);a=EXIF.readFromBinaryFile(e),n=7==a.Orientation||8==a.Orientation?270:3==a.Orientation||4==a.Orientation?180:6==a.Orientation||5==a.Orientation?90:0,o()}.bind(this)):o(),g.onload=function(t){r=document.createElement("img"),r.onload=function(){o()},r.src=t.target.result}}};
},{"./binaryFile":1,"./canvas-to-blob":2,"./exif":3}]},{},[4])