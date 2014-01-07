# Angular Responsive
Directive for hiding and showing elements based on view port width. The directive is for AngularJS `1.2.5+`.

## Building
First install dependencies.

```shell
npm install -g grunt-cli
npm install
bower install
```

Then to build the library just run grunt.

```shell
grunt
```

## Documentation

### Example
You can launch an example page by running grunt example.

```shell
grunt example
```

and your default browser should open to `http://localhost:3000/index.html`.

There are two example pages, one uses the default values and one uses custom classes and widths.

### Classes

There are a number of classes used for showing and hiding.

`visible-xs` : Only showing on 'xsmall'.

`visible-sm` : Only showing on 'small'.

`visible-md` : Only showing on 'medium'.

`visible-lg` : Only showing on 'large'.

`hidden-xs` : Showing on all except on 'xsmall'.

`hidden-sm` : Showing on all except on 'small'.

`hidden-md` : Showing on all except on 'medium'.

`hidden-lg` : Showing on all except on 'large'.


#### Bootstrap

The classes and widths used by the directive have been copied from [Bootstrap](http://getbootstrap.com/). It's however possible to customize both the classes and the widths used, see the [documentation below](#Customizing)

### Widths

The named widths are the following:

`xsmall` : Widths up to 767px.

`small` : Widths from 768px up to 991px.

`medium` : Widths from 992px up to 1199px.

`large` : Widths 1200px and larger.

### Customizing

#### Widths
To customize the different widths at which the page should adapt, just set new options for the widthOptionsProvider

```javascript
angular.module('myModule', []).config(["widthOptionsProvider",function(provider) {
  var options = {widths:[{name:"small",minWidth:0,maxWidth:599},
      {name:"medium",minWidth:600,maxWidth:1099},
      {name:"large",minWidth:1100,maxWidth:Infinity}]
  };
  provider.setOptions(options);
}]);
```
the options should be an object with a `widths` property consisting of an array with objects. Those object must have the following properties `name`, `minWidth` and `maxWidth`. If you change the names from any of the defaults you must add options for the classes as well.

#### Classes

These are used as rules for triggering based on the widths defined above.

```javascript
angular.module('myModule', []).config(["responderRuleFactoryProvider",function(provider){
    var classes = {classes:[
      {name:"show-small", rule: {visible:["small"]}},
      {name:"show-medium", rule: {visible:["medium"]}},
      {name:"show-large", rule: {visible:["large"]}},
      {name:"hide-small", rule: {visible:["medium","large"]}},
      {name:"hide-medium", rule: {visible:["small","large"]}},
      {name:"hide-large", rule: {visible:["small","medium"]}}
    ]
    };
    provider.setResponderClasses(classes);
}]);
```
the classes should be an object with a `classes` property containing an array with objects. Those objects must have a `name` and a `rule` property. The `rule` property should hold an object with a `visible` array containing strings that matches the names of the defined widths. The `name` property will be used as input to the directive.

### responsiveIf
Add a dependency to the directive

```javascript
angular.module('myModule', ['responsive.if']);
```

then just add the attribute `ee-responsive-if` with a string value consisting of one or more classes separated by a space

```html
    <div ee-responsive-if="'visible-sm visible-md'">angular-responsive</div>
```
#### Comments

The responsiveIf directive is very similar to ngIf, and that is why most of the directive code has been copied directly from the AngularJS ngIf directive. I would like to have had a better way of reusing this code, but can't figure one out.

## The Future

This is what is planned for the future.

### ResponsiveIf
The responsiveIf directive should play better with ngIf.

### Responsive images
A directive for responsive images will be added.

### Responsive classes
A directive to add classes based on widths will be added. This directive will never be something that should be used in production, but as a tool for the early parts of development.
