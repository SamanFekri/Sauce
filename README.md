# Sauce
Sauce just change its template to Vue.

## Usage

* add below at the after `</body>`
  ```HTML
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="../lib/sauce.js"></script>
  ```
* you must define the name and the path of template in variable and then pass it to sauce
  ```HTML
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script type="text/javascript" src="http://yourjavascript.com/202154111281/sauce.js"></script>
  <script>
    let sauces = [
      {name: 'ketchap', src: 'ketchap.sue'},
      {name: 'bold', src: 'bold.sue'}];
    new Sauce(sauces);
  </script>
  ```
* A sample template
  ```xml
  <root xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns="http://java.sun.com/JSP/Page" version="0.0.1">
      <id>app</id>
      <template>
          <p>{{ message }}</p>
          <button v-on:click="reverseMessage">Reverse Message</button>
          <p>{{ name }}</p>
      </template>
      <data>
          data : {
              message: 'Hello Sue!'
          }
      </data>
      <other>
          methods: {
              reverseMessage: function () {
                  this.message = this.message.split('').reverse().join('')
              }
          }
      </other>
      <style>
          p {
            color: red;
            font-size: 40px;
          }
      </style>
  </root>
  ```

* you can find some samples in sample folder :)