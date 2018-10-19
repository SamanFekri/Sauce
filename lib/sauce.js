function Sauce(sauces) {

  console.log(sauces);

  for (let i = 0; i < sauces.length; i++) {
    let temp = sauces[i];
    temp.size = document.getElementsByTagName(temp.name).length;
    console.log(temp);
    $.ajax(
      {
        url: temp.src,
        dataType: 'xml',
        success: function (data) {

          console.log(data);
          temp.id = $(data).find("id").text().trim();
          temp.style = $(data).find("style").text().trim();
          temp.template = $(data).find("template")[0].innerHTML;
          temp.data = $(data).find("data").text().trim();
          temp.other = $(data).find("other").text().trim();

          let items = document.getElementsByTagName(temp.name);
          console.log(items);

          for (let i = 0; i < items.length; i++) {
            let tmp = jQuery.extend(true, {}, temp);
            let parent = items[i];

            let attrs = parent.attributes;
            let has_id = -1;
            for (let j = 0; j < attrs.length; j++) {
              if (attrs[j].name !== 'id') {
                if (tmp.data == '') {
                  tmp.data = 'data: {}';
                  let n = tmp.data.lastIndexOf("}");
                  tmp.data = tmp.data.slice(0, n) + tmp.data.slice(n).replace("}", attrs[j].name + ": '" + attrs[j].value + "'}");
                } else {
                  let n = tmp.data.lastIndexOf("}");
                  tmp.data = tmp.data.slice(0, n) + tmp.data.slice(n).replace("}", "," + attrs[j].name + ": '" + attrs[j].value + "'}");
                }
              } else {
                has_id = j;
              }
            }

            if (has_id !== -1) {
              tmp.id = '_' + attrs[has_id].value;
            } else {
              tmp.id = tmp.id + '-' + i;
            }

            let html = '<style scoped>' + tmp.style + '</style>';
            html += '<div id=\'' + tmp.id + '\'>';
            html += tmp.template;
            html += '</div>';
            parent.innerHTML = html;

            let code = 'let ' + tmp.id + ' = new Vue({' + 'el: \'#' + tmp.id + '\'';

            if (tmp.data != '') {
              code += ',' + tmp.data;
            }

            if (tmp.other != '') {
              code += ',' + tmp.other;
            }

            code += '})';

            let script = $("<script />", {html: code});
            $("body").append(script);

          }
        }
      }
    )

  }

  // this.addSauce = function(sauce) {
  //   $.ajax(
  //     {
  //       url: sauce.src,
  //       dataType: 'xml',
  //       success: function (data) {
  //
  //         console.log(data);
  //         let style = $(data).find("style").text();
  //         this.injectStyles(style);
  //         this.injectScript(data);
  //
  //       }
  //     }
  //   )
  // };
  //
  // this.injectStyles = function (rule) {
  //   var div = $("<div />", {
  //     html: '&shy;<style>' + rule + '</style>'
  //   });
  //   $("body").append(div);
  // };
  //
  // this.injectScript = function (data) {
  //   var div = $("<script />", {
  //     html:
  //     'let x = new Vue({' +
  //     'el: \'#' + $(data).find("id").text() + '\',' +
  //     $(data).find("data").text() +
  //     '})'
  //   });
  //   $("body").append(div);
  // };
}


