# Sauce
Sauce just change its template to Vue.

## Usage

### Install
* add below at the after `</body>`
  ```HTML
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://rawcdn.githack.com/SamanFekri/Sauce/master/lib/sauce.js"></script>
  ```
* you must define the name and the path of template in variable and then pass it to sauce
  ```HTML
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://rawcdn.githack.com/SamanFekri/Sauce/master/lib/sauce.js"></script>
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
      <id>ket</id>
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
  
### How pass data

* You can pass data from attribute in html to vue like below:

  ```HTML
  <ketchap data:name="Saman"></ketchap>

  ```

* You can pass data using the tags inside html

  ```HTML
  <ketchap>
      <data:first-name>Saman</data:first-name>
      <data:last-name-name>Fekri</data:last-name-name>
      <data:desc>
          This is the description "Yoooooo"'hoooooooo'
      </data:desc>
  </ketchap>

  ```

### Access to vue object

* all vue objects which have same component is on a array that's name is id of component.

    for example in above template you can access vue object array with `ket[i]` and `i` is the number of object.
    
    
* if you want to have a specific object id for your custom template you can specify id in your html:

    ```HTML
      <ketchap id="my_ketchap"></ketchap>
    ```
    
    then you have access to that object with `'_' + <element_id>` in js, example id: `_my_ketchap`