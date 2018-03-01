 ////
function i2preventDefault(a){if(a.preventDefault)a.preventDefault();else a.returnValue=false}function setCaretToPos(a,b){setSelectionRange(a,b,b)}function setSelectionRange(a,b,c){if(a.setSelectionRange){a.focus();a.setSelectionRange(b,c)}else if(a.createTextRange){var d=a.createTextRange();d.collapse(true);d.moveEnd("character",c);d.moveStart("character",b);d.select()}}function getCaret(a){if(a.selectionStart){return a.selectionStart}else if(document.selection){a.focus();var b=document.selection.createRange();if(b==null){return 0}var c=a.createTextRange(),d=c.duplicate();c.moveToBookmark(b.getBookmark());d.setEndPoint("EndToStart",c);var e=0;for(var f=0;f<d.text.length;f++){if(d.text.substr(f,2)=="\r\n"){e+=2;f++}}return d.text.length+e}return 0}function loadChineseCandidatePage(a){var b=_candidChineseWords.length;maxPages=Math.ceil(b/BTNS_PER_PAGE);var c=BTNS_PER_PAGE*(a-1);var d=Math.min(c+BTNS_PER_PAGE,b);var e="";e+='<div style="float:left;"><div id="'+PGDN_KEY+'" type="button" class="styleBtn gel arrow">&#x25C4;</div></div>';for(var f=c;f<d;++f){var g=f-c;var h=NUM_LOCK_LO+g+NUM_LOCK_OFF;g=g+1;var i="<span>"+g+"</span>";var j=unescape(_candidChineseWords[f]);e+='<div style="float:left;"><div id="'+h+'" type="button" class="styleBtn gel">'+i+" "+j+"</div></div>"}e+='<div style="float:left;"><div id="'+PGUP_KEY+'" type="button" class="styleBtn gel arrow">&#x25BA;</div></div>';e+='<div id="pageno">'+_candidChineseWordsActivePage+"/"+maxPages+"</div>";$("#auxButtons").html(e)}function zhuyin2Chinese(){var a=$("#preview").val();var b=a.length;if(b>0){var c=escape(a[b-1]);if(inStringArray(c,_tones)>-1){var d=escape(jQuery.trim(a));if(d in z2c){NUM_SELECTOR=1;var e="";_candidChineseWordsActivePage=1;_candidChineseWords=z2c[d];loadChineseCandidatePage(_candidChineseWordsActivePage)}else{};}else{NUM_SELECTOR=0;$("#auxButtons").html("")}}}function roman2Chinese(){var a=$("#preview").val();var b=a.length;if(b>0){var c=searchTree(a);b=c.length;if(b>0){NUM_SELECTOR=0;$("#auxButtons").html("");_candidChineseWordsActivePage=1;_candidChineseWords=c;loadChineseCandidatePage(_candidChineseWordsActivePage)}else{NUM_SELECTOR=0;$("#auxButtons").html("")}}else{$("#auxButtons").html("")}}function rmHintWrd(a){return a.split(SPACE+"<div")[0]}function inStringArray(a,b){for(var c=0;c<b.length;++c){var d=new RegExp(b[c]);if(d.test(a)){return c}}return-1}function smartZhuyin(a){var b=-1;a=escape(a);if((b=inStringArray(a,_initials))>-1){animateBtnGroup(_initials,_iM,_fout)}else if((b=inStringArray(a,_finals))>-1){animateBtnGroup(_initials,_iM,_fout);animateBtnGroup(_finals,_fM,_fout);if(a==X_FINAL){animateBtnGroup(_X_Nbrs,_XM,_fin)}else if(a==D_FINAL){animateBtnGroup(_D_Nbrs,_DM,_fin)}else if(a==U_FINAL){animateBtnGroup(_U_Nbrs,_UM,_fin)}}else if((b=inStringArray(a,_X_Nbrs))>-1){animateBtnGroup(_X_Nbrs,_XM,_fout)}else if((b=inStringArray(a,_D_Nbrs))>-1){animateBtnGroup(_D_Nbrs,_DM,_fout)}else if((b=inStringArray(a,_U_Nbrs))>-1){animateBtnGroup(_U_Nbrs,_UM,_fout)}else if((b=inStringArray(a,_tones))>-1){animateBtnGroup(_tones,_tM,_fout)}}function animateBtnGroup(a,b,c){for(var d=0;d<a.length;++d){var e=a[d];var f=b[e];animateBtn(f,c);if(!LEARNING)$("."+f).attr("disabled",false)}}function animateKeyboard(a){animateBtnGroup(_initials,_iM,a);animateBtnGroup(_finals,_fM,a);animateBtnGroup(_tones,_tM,a)}function animateBtn(a,b){$("."+a).fadeTo("fast",b);if(LEARNING){if(b<.5)$("."+a).attr("disabled",true);else $("."+a).attr("disabled",false)}}function disableEmptyKeys(){var a=.2;for(var b=0;b<_disabledKeys.length;++b){var c=_disabledKeys[b];$("."+c).fadeTo("slow",a)}}function printZhu2Keys(a,b){var c=["192","49","50","51","52","53","54","55","56","57","48","189","187","8","9","81","87","69","82","84","89","85","73","79","80","219","221","220","20","65","83","68","70","71","72","74","75","76","186","222","13","16","90","88","67","86","66","78","77","188","190","191","1016","17","1018","32","18","1017"];for(var d=0;d<a.length;++d){var e=a[d];for(var f=0;f<c.length;++f){var g=c[f];var h=$("."+g).val();if(escape(h)==e){var i=b+'["'+e+'"] = new Array("'+g+'");'+"\r";$("#preview").insertAtCaret(i)}}}}function getKey(a){var b=["192","49","50","51","52","53","54","55","56","57","48","189","187","8","9","81","87","69","82","84","89","85","73","79","80","219","221","220","20","65","83","68","70","71","72","74","75","76","186","222","13","16","90","88","67","86","66","78","77","188","190","191","1016","17","1018","32","18","1017"];for(var c=0;c<b.length;++c){var d=b[c];var e=$("."+d).val();if(escape(e)==a){return d}}return-1}function doGelClick(a){a+=NUM_LOCK_LO-1;if(a>=NUM_LOCK_LO&&a<=NUM_LOCK_HI){a+=NUM_LOCK_OFF;$("#"+a).click()}}function enableGroupBtns(a){var b=a.length-1;if(b>=0){var c=escape(a[b]);if((index=inStringArray(c,_initials))>-1){animateBtnGroup(_initials,_iM,_fin)}else if((index=inStringArray(c,_finals))>-1){if(b>=1){c=escape(a[b-1]);if((index=inStringArray(c,_fGroups))>-1){if(c==X_FINAL){animateBtnGroup(_X_Nbrs,_XM,_fin)}else if(c==D_FINAL){animateBtnGroup(_D_Nbrs,_DM,_fin)}else if(c==U_FINAL){animateBtnGroup(_U_Nbrs,_UM,_fin)}}else{animateBtnGroup(_finals,_fM,_fin)}}else{animateBtnGroup(_finals,_fM,_fin)}if(b==0){animateBtnGroup(_initials,_iM,_fin)}}else if((index=inStringArray(c,_tones))>-1){animateBtnGroup(_tones,_tM,_fin)}}}function uxxxx2xuuuu(a){var b="";var c=escape(a).split("%u");for(var d=0;d<c.length;++d){var e=c[d];var f=0;for(var g=0;g<e.length;++g){if(g==0){b+="&#x"}b+=e[g];++f;if(f==4){b+=";"}}}return b}function process_keyup(a,b){if((b.target||b.srcElement).id=="preview"){var c=inStringArray(a,alphanumeric_ids);if(c>-1){$("."+a).removeClass("shadow");$("."+a).removeClass("cyan")}if(a==SHIFT_KEY){shift_btn=0;_shift_left=0;_shift_right=0;load_keyboard(_active_language)}else if(a==CTRL_KEY){ctrl_btn=0;_ctrl_left=0;_ctrl_right=0;load_keyboard(_active_language)}else if(a==ALT_KEY){alt_btn=0;_alt_left=0;_alt_right=0;load_keyboard(_active_language)}if(!_auxEditorInFocus){if(a==TAB_KEY||a==ENTER_KEY||!_caps||a==BKSPACE_KEY){$("#preview").focus();$("."+a).removeClass("shadow");$("."+a).removeClass("cyan")}}else{if(_active_language=="Zhuyin"||_active_language=="Pinyin"||_active_language=="Cantonese"||_active_language=="Cangjie"){if(a==TAB_KEY||a==ENTER_KEY||!_caps||a==BKSPACE_KEY){$("#preview").focus();$("."+a).removeClass("shadow");$("."+a).removeClass("cyan")}if(_active_language=="Zhuyin"){if(!NUM_SELECTOR){zhuyin2Chinese()}}else if(_active_language=="Pinyin"||_active_language=="Cantonese"||_active_language=="Cangjie"){if(a>=NUM_LOCK_LO&&a<=NUM_LOCK_HI){roman2Chinese()}}}}}}function IE_keyup(a){if(_IE){var b="which"in a?a.which:a.keyCode;process_keyup(b,a)}}function stripHtml(a){var b=document.createElement("DIV");b.innerHTML=a;return b.textContent||b.innerText}function process_keydown(a,b){if((b.target||b.srcElement).id=="preview"){if(a==SHIFT_KEY){shift_btn=1}else if(a==CTRL_KEY){ctrl_btn=1}else if(a==ALT_KEY){alt_btn=1}$("."+a).addClass("shadow");$("."+a).addClass("cyan");if(a==SHIFT_KEY||a==CTRL_KEY||a==ALT_KEY||a==CAPS_KEY||a==TAB_KEY){simulate_mouse_click=1;$("."+a).click();simulate_mouse_click=0}var c=inStringArray(a,alphanumeric_ids);if(c>-1&&!ctrl_btn||c>-1&&ctrl_btn&&alt_btn||c>-1&&shift_btn&&alt_btn||c>-1&&alt_btn||c>-1&&ctrl_btn&&alt_btn&&shift_btn){i2preventDefault(b);simulate_mouse_click=1;$("."+a).click();simulate_mouse_click=0}if(_active_language=="Zhuyin"||_active_language=="Pinyin"||_active_language=="Cantonese"||_active_language=="Cangjie"){if(a==ENTER_KEY||a==BKSPACE_KEY||a==PGUP_KEY||a==PGDN_KEY){i2preventDefault(b);simulate_mouse_click=1;if(_active_language=="Zhuyin"){if((a==PGUP_KEY||a==PGDN_KEY)&&NUM_SELECTOR)$("#"+a).click();else $("."+a).click()}else if(_active_language=="Pinyin"||_active_language=="Cantonese"||_active_language=="Cangjie"){if(a==PGUP_KEY||a==PGDN_KEY)$("#"+a).click();else $("."+a).click()}simulate_mouse_click=0}if(a==DEL_KEY&&LEARNING&&_auxEditorInFocus){i2preventDefault(b)}}}}function IE_keydown(a){if(_IE){var b="which"in a?a.which:a.keyCode;process_keydown(b,a)}}function updateUI(a,b){$("#"+a+" option:selected").removeAttr("selected");$("#"+a+" option[value="+b+"]").attr("selected","selected");load_keyboard(b)}function goPageTop(){$("html, body").animate({scrollTop:0},500)}function hideBanner(){$("#iBanner").slideUp("slow");goPageTop();$("#hide_banner").text("Show Top Banner")}function get_back_pane(){var a=document.getElementById("ListBox_Types_fonts");var b=a.length;var c=a.selectedIndex;if(c>0)c-=1;else c=b-1;a.selectedIndex=c;var d=a.options[c].value;update_fonts(d)}function get_next_pane(){var a=document.getElementById("ListBox_Types_fonts");var b=a.length;var c=a.selectedIndex;if(c<b-1)c+=1;else c=0;a.selectedIndex=c;var d=a.options[c].value;update_fonts(d)}function get_active_language(){var a=document.getElementById("ListBox_Languages");var b=a.selectedIndex;var c=a.options[b].value;return c}function update_fonts(a){$("#aksaraLokal").css({"font-family":a})}function check_IE_browser(){var a={Version:function(){var a=999;if(navigator.appVersion.indexOf("MSIE")!=-1)a=parseFloat(navigator.appVersion.split("MSIE")[1]);return a}};if(a.Version()<9){_IE=1;$("#IE_Msg").css({background:"#e60861",color:"#fff",font:"bold 13px verdana",margin:"0 auto",width:"100%",padding:"20px"});$("#IE_Msg").html("For great user experience, please try Google Chrome, Firefox, or Safari.")}}function updateCharCount(){var a=$("#preview").val().length;$("#iChar").val(a);if(a>140)$("#iChar").css({color:"#FF0054"});else $("#iChar").css({color:"#444"})}function update_highlight(){if(_caps==1){$("#caps").css({background:"#0097DD"})}if(_shift_left==1){$("#shift_left").css({background:"#FE0E5D"})}if(_shift_right==1){$("#shift_right").css({background:"#FE0E5D"})}if(_alt_left==1){$("#alt_left").css({background:"#FE0E5D"})}if(_alt_right==1){$("#alt_right").css({background:"#FE0E5D"})}if(_ctrl_left==1){$("#ctrl_left").css({background:"#FE0E5D"})}if(_ctrl_right==1){$("#ctrl_right").css({background:"#FE0E5D"})}}function update_key_logic(){var a=_alt_left||_alt_right;var b=_ctrl_left||_ctrl_right;var c=_shift_left||_shift_right;if(b&&a&&c||_alt_right&&c){_level=4}else if(b&&a||_alt_right){_level=3}else if(c){if(_caps)_level=1;else _level=2}else if(_caps){_level=5}else{_level=1}}function load_keyboard(a){var b="";if(a!=_active_language){hideBanner()}update_key_logic();_active_language=a;if(_active_language=="Zhuyin"||_active_language=="Pinyin"||_active_language=="Cantonese"||_active_language=="Cangjie"){_auxEditorInFocus=1;$("#zhuchi").show();$("#preview").focus();if(_active_language=="Zhuyin"){$("#learning").show();$("#preview").css({"font-size":"27px",height:"34px","padding-top":"10px"});if($("#learning_check").is(":checked")){LEARNING=1}else{LEARNING=0}}else if(_active_language=="Pinyin"||_active_language=="Cantonese"||_active_language=="Cangjie"){LEARNING=0;if(!loadTree){setupTree();loadTree=1}$("#preview").css({"font-size":"13px",height:"25px","padding-top":"10px"})}}else{_auxEditorInFocus=0;LEARNING=0;$("#zhuchi").hide();$("#preview").focus();$("#learning").css({display:"none"})}switch(a){case"Afrikaans":b=Afrikaans();break;case"Albanian":b=Albanian();break;case"Arabic":b=Arabic();break;case"Armenian":b=Armenian();break;case"Assamese":b=Assamese();break;case"Basque":b=Basque();break;case"Belarusian":b=Belarusian();break;case"Bengali":b=Bengali();break;case"Bosnian":b=Bosnian();break;case"Bulgarian":b=Bulgarian();break;case"Catalan":b=Catalan();break;case"Chinese":b=Chinese();break;case"Cornish":b=Cornish();break;case"Croatian":b=Croatian();break;case"Czech":b=Czech();break;case"Danish":b=Danish();break;case"Dutch":b=Dutch();break;case"English":b=English();break;case"Estonian":b=Estonian();break;case"Faeroese":b=Faeroese();break;case"Farsi":b=Farsi();break;case"Finnish":b=Finnish();break;case"French":b=French();break;case"Galician":b=Galician();break;case"Georgian":b=Georgian();break;case"German":b=German();break;case"Greek":b=Greek();break;case"Gujarati":b=Gujarati();break;case"Hebrew":b=Hebrew();break;case"Hungarian":b=Hungarian();break;case"Hindi":b=Hindi();break;case"Icelandic":b=Icelandic();break;case"Italian":b=Italian();break;case"Hiragana":b=Hiragana();break;case"Katakana":b=Katakana();break;case"Kannada":b=Kannada();break;case"Kazakh":b=Kazakh();break;case"Konkani":b=Konkani();break;case"Korean":b=Korean();break;case"Latvian":b=Latvian();break;case"Lithuanian":b=Lithuanian();break;case"Macedonian":b=Macedonian();break;case"Malayalam":b=Malayalam();break;case"Malay":b=Malay();break;case"Maltese":b=Maltese();break;case"Marathi":b=Marathi();break;case"Mongolian":b=Mongolian();break;case"Nepal":b=Nepal();break;case"Norwegian":b=Norwegian();break;case"Polish":b=Polish();break;case"Portuguese":b=Portuguese();break;case"Punjabi":b=Punjabi();break;case"Quechua":b=Quechua();break;case"Romanian":b=Romanian();break;case"Russian":b=Russian();break;case"Sanskrit":b=Sanskrit();break;case"Serbian":b=Serbian();break;case"Slovak":b=Slovak();break;case"Spanish":b=Spanish();break;case"Tamil":b=Tamil();break;case"Tatar":b=Tatar();break;case"Telugu":b=Telugu();break;case"Thai":b=Thai();break;case"Turkish":b=Turkish();break;case"Ukrainian":b=Ukrainian();break;case"Urdu":b=Urdu();break;case"Uzbek":b=Uzbek();break;case"Vietnamese":b=Vietnamese();break;case"Welsh":b=Welsh();break;case"Xhosa":b=Xhosa();break;case"Zulu":b=Zulu();break;case"Zhuyin":b=Zhuyin();break;case"Pinyin":b=Pinyin();break;case"Cantonese":b=Cantonese();break;case"Cangjie":b=Cangjie();break}$("#keyboard").html(b);update_highlight();if(_active_language=="Zhuyin"){disableEmptyKeys()}}function reset_ctrl_keys(){_shift_left=0;_shift_right=0;_alt_left=0;_alt_right=0;_ctrl_left=0;_ctrl_right=0}function init(a){check_IE_browser();$("#preview").css({"font-size":_font_size});load_keyboard(_active_language);updateCharCount();extName=a;$("#extName").val(extName)}function update_language_direction(){if(_active_language=="Arabic"||_active_language=="Hebrew"||_active_language=="Urdu")$("#r2l").click();else $("#l2r").click()}function save_as_word(){var a=download_url+"/"+Math.floor(Math.random()*1e5);window.location=a}function display(a){var b=a.length;var c="";for(var d=0;d<b;++d){c+=a[d].split(" ")[1];if(d%9==0&&d!=0)c+="\r"}$("#preview").val(c)}function searchTree(a){var b=new Array;root=trie.find(a);if(root){var c=root.getWords();var d=c.length;for(var e=0;e<d;++e){var f=c[e].split(" ");b.push(f[1]+SPACE+styleHint(f[0].substring(1)))}}return b}function styleHint(a){return'<div style="font:normal 13px verdana;color:#FFDA47;">'+a+"</div>"}function setupTree(){dic=dic.split(",");trie=new Trie;for(var a=0;a<dic.length;++a){var b=dic[a].split(" ");for(var c=1;c<b.length;++c){trie.add(b[0]+" "+b[c])}}}function load_n_level_chooser(a,b,c,d,e){update_language_direction();var f;if(_level==1)f=a;else if(_level==2)f=b;else if(_level==3)f=c;else if(_level==4)f=d;else if(_level==5)f=e;if(f.length==0){f=a}var g="59";var h="107";var i="109";if($.browser.webkit){g="186";h="187";i="189"}var j=["192","49","50","51","52","53","54","55","56","57","48",i,h,"8","9","81","87","69","82","84","89","85","73","79","80","219","221","220","20","65","83","68","70","71","72","74","75","76",g,"222","13","16","90","88","67","86","66","78","77","188","190","191","1016","17","1018","32","18","1017"];var k=["~","1","2","3","4","5","6","7","8","9","0","-","=","","","Q","W","E","R","T","Y","U","I","O","P","[","]","\\","","A","S","D","F","G","H","J","K","L",";","'","","","Z","X","C","V","B","N","M",",",".","/","","","","","",""];var l='<div id="keypad">';for(var m=0;m<=12;++m){var n='<input type="button" class="button silver key '+j[m]+'" value="'+f[m]+'" />';if(_active_language=="Zhuyin"){l+='<div class="frm"><div class="sups">'+k[m]+"</div>"+n+"</div>"}else{l+=n}}l+='<input type="button" class="button dark '+j[13]+'" id="backspace" value="Busak" />';l+='<div style="clear:both;"></div>';l+='<input type="button" class="button dark '+j[14]+'" id="tab" value="Tab" />';for(var m=15;m<=27;++m){var n='<input type="button" class="button silver key '+j[m]+'" value="'+f[m]+'" />';if(_active_language=="Zhuyin"){l+='<div class="frm"><div class="sups">'+k[m]+"</div>"+n+"</div>"}else{l+=n}}l+='<div style="clear:both;"></div>';l+='<input type="button" class="button dark '+j[28]+'" id="caps" value="CpsLock" />';for(var m=29;m<=39;++m){var n='<input type="button" class="button silver key '+j[m]+'" value="'+f[m]+'" />';if(_active_language=="Zhuyin"){l+='<div class="frm"><div class="sups">'+k[m]+"</div>"+n+"</div>"}else{l+=n}}l+='<input type="button"  class="button dark '+j[40]+'" id="enter" value="Enter" />';l+='<div style="clear:both;"></div>';l+='<input type="button" class="button dark '+j[41]+'" id="shift_left" value="Shift" />';for(var m=43;m<=52;++m){var n='<input type="button" class="button silver key '+j[m-1]+'" value="'+f[m]+'" />';if(_active_language=="Zhuyin"){l+='<div class="frm"><div class="sups">'+k[m-1]+"</div>"+n+"</div>"}else{l+=n}}l+='<input type="button" class="button dark '+j[52]+'" id="shift_right" value="Shift" />';l+='<div style="clear:both;"></div>';l+='<div style="margin-left:50px;">';l+='<input type="button" class="button dark '+j[53]+'" id="ctrl_left" value="Ctrl" />';l+='<input type="button" class="button dark '+j[54]+'" id="alt_left" value="Alt" />';l+='<input type="button" class="button silver key '+j[55]+'" id="spacebar" value=" " />';l+='<input type="button" class="button dark '+j[56]+'" id="alt_right" value="Alt" />';l+='<input type="button" class="button dark '+j[57]+'" id="ctrl_right" value="Ctrl" />';l+="</div>";l+='<div style="clear:both;"></div>';l+="</div>";return l}function Zhuyin(){var a=["ṅ","&#x0031;","&#x0032;","&#x0033;","&#x0034;","&#x0035;","&#x0036;","&#x0037;","&#x0038;","&#x0039;","&#x0030;","&#x002D;","&#x003D;","","","&#x0071;","&#x0077;","&#x0065;","&#x0072;","&#x0074;","&#x0079;","&#x0075;","&#x0069;","&#x006F;","&#x0070;","&#x005B;","&#x005D;","&#x005C;","","&#x0061;","&#x0073;","&#x0064;","&#x0066;","&#x0067;","&#x0068;","&#x006A;","&#x006B;","&#x006C;","&#x003B;","&#x0027;","","","","&#x007A;","&#x0078;","&#x0063;","&#x0076;","&#x0062;","&#x006E;","&#x006D;","&#x002C;","&#x002E;","&#x002F;","","",""];var b=["ṅ","&#x3105;","&#x3109;","&#x02C7;","&#x02CB;","&#x3113;","&#x02CA;","&#x02D9;","&#x311A;","&#x311E;","&#x3122;","&#x3126;","","","","&#x3106;","&#x310A;","&#x310D;","&#x3110;","&#x3114;","&#x3117;","&#x3127;","&#x311B;","&#x311F;","&#x3123;","","","","","&#x3107;","&#x310B;","&#x310E;","&#x3111;","&#x3115;","&#x3118;","&#x3128;","&#x311C;","&#x3120;","&#x3124;","","","","","&#x3108;","&#x310C;","&#x310F;","&#x3112;","&#x3116;","&#x3119;","&#x3129;","&#x311D;","&#x3121;","&#x3125;","","",""];var c=["","","","","","","","","","","","","","","","&#x624B;","&#x7530;","&#x6C34;","&#x53E3;","&#x5EFF;","&#x535C;","&#x5C71;","&#x6208;","&#x4EBA;","&#x5FC3;","","","","","&#x65E5;","&#x5C38;","&#x6728;","&#x706B;","&#x571F;","&#x7AF9;","&#x5341;","&#x5927;","&#x4E2D;","","","","","","&#x91CD;","&#x96E3;","&#x91D1;","&#x5973;","&#x6708;","&#x5F13;","&#x4E00;","","","","","",""];var d=a;var e=a;return load_n_level_chooser(a,b,c,d,e)}var Trie=function(){function d(a,b){var c=a.nstem,d=b.nstem;return c>d?1:c<d?-1:0}function c(a,b){var c=a.nstem,d=b.nstem;return c<d?1:c>d?-1:0}function b(a,b,c){if(!a||!b||!c)return null;var d,e,f,g,h;while(a.length>0){d=a.charAt(0),e=b.children,f=e.length,g=0;for(;g<f;++g){if(d==e[g].stem)break}if(g==f)return null;a=a.substring(1),h=b,b=e[g]}return c(h,g)}function a(b,c){this.stem=b||"";this.nstem=this.stem.charCodeAt(0);this.sorting=c||a.SORT_DESC;this.wordCount=0;this.prefixCount=0;this.children=[]}a.SORT_ASC=1;a.SORT_DESC=2;a.SORT_NONE=4;a.prototype={add:function(b){if(b){var c,d=this.sorting,e=0,f=b.charAt(0),g=this.children,h=g.length;for(;e<h;++e){if(g[e].stem==f){c=g[e];break}}if(!c){++this.prefixCount;c=new a(f,d);if(!d||!g.length||d&a.SORT_NONE){g.push(c)}else if(d&a.SORT_DESC){e=h;do{if(--e<0){g.unshift(c);break}}while(g[e].stem>f);if(e>=0)g.splice(e+1,0,c)}else{e=0,--h;do{if(++e>h){g.unshift(c);break}}while(g[e].stem>f);if(e<=h)g.splice(e,0,c)}}c.add(b.substring(1))}else{++this.wordCount}},update:function(a,b){this.remove(a);this.add(b)},remove:function(a){b(a,this,function(a,b){a.children.remove(b)})},find:function(a){return b(a,this,function(a,b){return a.children[b]})},findPrefix:function(a){return this.find(a)},getChild:function(a){var b=0,c=this.children,d=c.length;for(;b<d;++b){if(c[b].stem==a)return c[b]}return null},hasChild:function(a){return this.getChild(a)!==null},sort:function(b){if(typeof b=="undefined")b=a.SORT_DESC;if(!this.prefixCount||this.sorting===b)return;this.sorting=b;if(b&a.SORT_NONE)return;var e=this.children,f=e.length-1,g=b&a.SORT_ASC?c:d;e.sort(g);for(;f>=0;--f)e[f].sort(b)},getWords:function(a){a=a||this.stem;var b=[],c=this.children,d=0,e=c.length;for(;d<e;++d){if(c[d].wordCount)b.push(a+c[d].stem);b=b.concat(c[d].getWords(a+c[d].stem))}return b},getPrefixCount:function(a){return b(a,this,function(a,b){return a.children[b].prefixCount})||0},getWordCount:function(a){return b(a,this,function(a,b){return a.children[b].wordCount})||0},toString:function(){return"[Trie] '"+this.stem+"': {\n"+"    stem: "+this.stem+",\n"+"    prefixCount: "+this.prefixCount+",\n"+"    wordCount: "+this.wordCount+",\n"+"    children: [Array]{"+this.children.length+"}\n"+"}"}};return a}();var _IE=0;var _active_language="";var MAX_ZHUYIN_INPUT=5;var _font_size=31;var extName="";var _candidChineseWords=new Array;var _candidChineseWordsActivePage=1;var _auxEditorInFocus=1;var _level=1;var _caps=0;var _shift_left=0;var _shift_right=0;var _alt_left=0;var _alt_right=0;var _ctrl_left=0;var _ctrl_right=0;var download_url="";var simulate_mouse_click=0;var ctrl_btn=0;var alt_btn=0;var shift_btn=0;var SHIFT_KEY=16;var CTRL_KEY=17;var ALT_KEY=18;var TAB_KEY=9;var ENTER_KEY=13;var BKSPACE_KEY=8;var CAPS_KEY=20;var DEL_KEY=46;var SPACE=" ";var BTNS_PER_PAGE=6;var NUM_LOCK_LO=49;var NUM_LOCK_HI=NUM_LOCK_LO+BTNS_PER_PAGE-1;var NUM_LOCK_OFF=1e3;var PGUP_KEY=33;var PGDN_KEY=34;var NUM_SELECTOR=0;var LEARNING=1;var _fin=1;var _fout=.3;var exit=0;var _hide=1;var _disabledKeys=new Array("187","192","219","220","221","222");var Y_FINAL="%u311A";var D_FINAL="%u3127";var X_FINAL="%u3128";var U_FINAL="%u3129";var _tones=new Array("%20","%u02D9","%u02CA","%u02C7","%u02CB");var _initials=new Array("%u3105","%u3106","%u3107","%u3108","%u3109","%u310A","%u310B","%u310C","%u310D","%u310E","%u310F","%u3110","%u3111","%u3112","%u3113","%u3114","%u3115","%u3116","%u3117","%u3118","%u3119");var _finals=new Array("%u311A","%u311B","%u311C","%u311D","%u311E","%u311F","%u3120","%u3121","%u3122","%u3123","%u3124","%u3125","%u3126",D_FINAL,X_FINAL,U_FINAL);var _fGroups=new Array("%u3127","%u3128","%u3129");var _Y=new Array("%u311A","%u311B","%u311C","%u311D","%u311E","%u311F","%u3120","%u3121","%u3122","%u3123","%u3124","%u3125","%u3126");var _D_Nbrs=new Array("%u311A","%u311B","%u311D","%u311E","%u3120","%u3121","%u3122","%u3123","%u3124","%u3125");var _X_Nbrs=new Array("%u311A","%u311B","%u311E","%u311F","%u3122","%u3123","%u3124","%u3125");var _U_Nbrs=new Array("%u311D","%u3122","%u3123","%u3125");var _mapZhu2Num=new Array("%u3122","%u3105","%u3109","%u02C7","%u02CB","%u3113","%u02CA","%u02D9","%u311A","%u311E");var _mapPin2Num=new Array("0","1","2","3","4","5","6","7","8","9");var trie;var loadTree=0;var _kSemiColon=59;var _kEqual=107;var _kMinus=109;if($.browser.webkit){_kSemiColon=186;_kEqual=187;_kMinus=189}var alphanumeric_ids=[192,49,50,51,52,53,54,55,56,57,48,_kMinus,_kEqual,-1,-1,81,87,69,82,84,89,85,73,79,80,219,221,220,-1,65,83,68,70,71,72,74,75,76,_kSemiColon,222,-1,-1,90,88,67,86,66,78,77,188,190,191,-1,-1,-1,32,-1,-1];$("#preview").live("focus",function(){_auxEditorInFocus=0});$("#preview").live("focus",function(){_auxEditorInFocus=1});$(window).keydown(function(a){if(!_IE){key=a.keyCode?a.keyCode:a.which;process_keydown(key,a)}});$(window).keyup(function(a){if(!_IE){key=a.keyCode?a.keyCode:a.which;process_keyup(key,a)}});$("#tab").live("click",function(){if(!_auxEditorInFocus){val="\t";$("#preview").insertAtCaret(val);$("#preview").trigger("change")}});$("#enter").live("click",function(){val="\r";$("#preview").insertAtCaret(val);$("#preview").trigger("change")});$("#backspace").live("click",function(){if(!_auxEditorInFocus){var a=document.getElementById("preview");var b=getCaret(a);var c=$("#preview").val();val=c.substring(0,b-1)+c.substring(b,c.length);$("#preview").val("");$("#preview").insertAtCaret(val);$("#preview").trigger("change");setCaretToPos(document.getElementById("preview"),b-1)}else{if(_active_language=="Zhuyin"||_active_language=="Pinyin"||_active_language=="Cantonese"||_active_language=="Cangjie"){var a=document.getElementById("preview");var b=getCaret(a);var c=$("#preview").val();var d=0;if(_active_language=="Zhuyin"){if(LEARNING){d=c.length}if(b>=d){val=c.substring(0,b-1)+c.substring(b,c.length);$("#preview").val("");$("#preview").insertAtCaret(val);setCaretToPos(document.getElementById("preview"),b-1);zhuyin2Chinese();if(LEARNING){enableGroupBtns(c)}}}else if(_active_language=="Pinyin"||_active_language=="Cantonese"||_active_language=="Cangjie"){val=c.substring(0,b-1)+c.substring(b,c.length);$("#preview").val("");$("#preview").insertAtCaret(val);setCaretToPos(document.getElementById("preview"),b-1);roman2Chinese()}}}});$("#caps").live("click",function(){_caps=!_caps;load_keyboard(_active_language)});$("#shift_left").live("click",function(){if(simulate_mouse_click){_shift_left=1}else{_shift_left=!_shift_left;if(!_shift_left){ctrl_btn=0}}_shift_right=0;load_keyboard(_active_language)});$("#ctrl_left").live("click",function(){if(simulate_mouse_click){_ctrl_left=1}else{_ctrl_left=!_ctrl_left;if(!_ctrl_left){ctrl_btn=0}}_ctrl_right=0;load_keyboard(_active_language)});$("#shift_right").live("click",function(){if(simulate_mouse_click){_shift_right=1}else{_shift_right=!_shift_right;if(!_shift_right){ctrl_btn=0}}_shift_left=0;load_keyboard(_active_language)});$("#ctrl_right").live("click",function(){if(simulate_mouse_click){_ctrl_right=1}else{_ctrl_right=!_ctrl_right;if(!_ctrl_right){ctrl_btn=0}}_ctrl_left=0;load_keyboard(_active_language)});$("#alt_right").live("click",function(){if(simulate_mouse_click){_alt_right=1}else{_alt_right=!_alt_right;if(!_alt_right){alt_btn=0}}_alt_left=0;load_keyboard(_active_language)});$("#alt_left").live("click",function(){if(simulate_mouse_click){_alt_left=1}else{_alt_left=!_alt_left;if(!_alt_left){alt_btn=0}}_alt_right=0;load_keyboard(_active_language)});$(".button.silver.key").live("click",function(){if(_active_language=="Zhuyin"){var a=$(this).val();if(NUM_SELECTOR){var b=inStringArray(escape(a),_mapZhu2Num);if(b>-1){doGelClick(b)}}else{if(shift_btn||_shift_left||_shift_right){$("#preview").insertAtCaret(a)}else if($("#preview").val().length<MAX_ZHUYIN_INPUT){if(!$(this).is(":disabled")){var c=false;if(!_auxEditorInFocus){var d=$(this).attr("id");if(d=="spacebar"){$("#preview").insertAtCaret(a)}else{c=true}}else{c=true}if(c){$("#preview").insertAtCaret(a);if(LEARNING){smartZhuyin(a)}zhuyin2Chinese()}}}}}else if(_active_language=="Pinyin"||_active_language=="Cantonese"||_active_language=="Cangjie"){var a=$(this).val();var b=inStringArray(escape(a),_mapPin2Num);if(b>=1&&b<=9){doGelClick(b)}else{if(shift_btn){$("#preview").insertAtCaret(a)}else{var d=$(this).attr("id");if(d=="spacebar"){if(_auxEditorInFocus){$("."+NUM_LOCK_LO).click()}else{$("#preview").insertAtCaret(a)}}else{$("#preview").insertAtCaret(a);roman2Chinese()}}}}else{var a=$(this).val();$("#preview").insertAtCaret(a);_editor=$("#preview").val();if(_hide){_hide=0;hideBanner()}$("#preview").trigger("change")}});$(".styleBtn.gel").live("click",function(){if(_active_language=="Zhuyin"||_active_language=="Pinyin"||_active_language=="Cantonese"||_active_language=="Cangjie"){var a=$(this).attr("id");var b=a-NUM_LOCK_OFF;if(b>=NUM_LOCK_LO&&b<=NUM_LOCK_HI){var c=b-NUM_LOCK_LO+BTNS_PER_PAGE*(_candidChineseWordsActivePage-1);var d=unescape(rmHintWrd(_candidChineseWords[c]));$("#preview").insertAtCaret(d);if(_active_language=="Zhuyin"){animateKeyboard(1)}NUM_SELECTOR=0;$("#preview").val("");$("#auxButtons").html("");$("#preview").focus()}else if(a==PGUP_KEY){var e=BTNS_PER_PAGE*_candidChineseWordsActivePage;if(e<_candidChineseWords.length){++_candidChineseWordsActivePage;loadChineseCandidatePage(_candidChineseWordsActivePage)}else{$("#"+PGUP_KEY).fadeTo("slow",.2);$("#"+PGUP_KEY).attr("disabled",true);$("#"+PGDN_KEY).fadeTo("slow",1);$("#"+PGDN_KEY).attr("disabled",false)}}else if(a==PGDN_KEY){var e=BTNS_PER_PAGE*(_candidChineseWordsActivePage-1);if(e>0){--_candidChineseWordsActivePage;loadChineseCandidatePage(_candidChineseWordsActivePage)}else{$("#"+PGDN_KEY).fadeTo("slow",.2);$("#"+PGDN_KEY).attr("disabled",true);$("#"+PGUP_KEY).fadeTo("slow",1);$("#"+PGUP_KEY).attr("disabled",false)}}if(_hide){_hide=0;hideBanner()}$("#preview").trigger("change")}});$("#font_plus").live("click",function(){if(_font_size<=40){_font_size+=2;$("#aksaraLokal").css({"font-size":_font_size})}});$("#font_minus").live("click",function(){if(_font_size>=13){_font_size-=2;$("#aksaraLokal").css({"font-size":_font_size})}});$("#clear_btn").live("click",function(){_editor="";$("#preview").val("");updateCharCount()});$("#learning_check").live("click",function(a){LEARNING=$(this).attr("checked");animateKeyboard(1)})
