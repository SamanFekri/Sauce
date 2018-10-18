function Sauce(sauces) {

  console.log(sauces);

  // find in html
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

          let items = document.getElementsByTagName(temp.name);
          console.log(items);

          for (let i = 0; i < items.length; i++) {
            let parent = items[i];
            let html = '<style scoped>' + temp.style + '</style>';
            html += '<div id=\'' + temp.id + '-' + i + '\'>';
            html += temp.template;
            html += '</div>';
            parent.innerHTML = html;
            var script = $("<script />", {
              html:
              'let ' + temp.id + '_' + i + ' = new Vue({' +
              'el: \'#' + temp.id + '-' + i + '\',' +
              temp.data +
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


