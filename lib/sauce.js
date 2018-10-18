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
          temp.data = $(data).find("data").text();
          temp.other = $(data).find("other").text();


          let items = document.getElementsByTagName(temp.name);
          console.log(items);

          for (let i = 0; i < items.length; i++) {
            let tmp = jQuery.extend(true, {}, temp);
            let parent = items[i];

            let attrs = parent.attributes;
            for (let j = 0; j < attrs.length; j++) {
              if (attrs[j].name !== 'id') {
                let n = tmp.data.lastIndexOf("}");
                tmp.data = tmp.data.slice(0, n) + tmp.data.slice(n).replace("}", "," + attrs[j].name + ": '" + attrs[j].value + "'}");
              } else {
                tmp.id = attrs[j].value;
              }

            }

            let html = '<style scoped>' + tmp.style + '</style>';
            html += '<div id=\'' + tmp.id + '-' + i + '\'>';
            html += tmp.template;
            html += '</div>';
            parent.innerHTML = html;
            let script = $("<script />", {
              html:
              'let ' + tmp.id + '_' + i + ' = new Vue({' +
              'el: \'#' + tmp.id + '-' + i + '\',' +
              tmp.data + ',' +
              tmp.other +
              '})'
            });


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


