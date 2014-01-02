# Angular Responsive
Directive for hiding and showing elements based on view port width.

## Comments

### Bootstrap

The classes and widths used by the directive have been copied from [Bootstrap](http://getbootstrap.com/).
It's however possible to customize both the classes and the widths used.

### ngIf
The directive is very similar to ngIf, and that is why most of the directive code has been copied directly from the AngularJS ngIf directive. I would like to have had a better way of reusing this code, but can't figure out a better one.

## Building
First install dependencies.

```shell
npm install -g grunt-cli
npm install
bower install
```

To build the library just run grunt.

```shell
grunt
```

## Example
To launch the example just run
```shell
grunt example
```

and your default browser should open to `http://localhost:3000/index.html`.

There are two example pages, one uses the default values and one uses custom classes and widths.

## The Future

The responsiveIf directive should play better with ngIf.

### Responsive images
A directive for responsive images will be added.

### Responsive classes
A directive to add classes based on widths will be added. This directive will never be something that should be used in production, but as a tool for the early parts of development.