---
layout: preview
preview: table-view
title: Table view
group: components
---

Table views can be used for organizing data, showing collections of links, or a series of controls.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Basic example
The most basic table view is simply an unordered list with list items, and the proper classes. Build upon it with the options that follow, or your own CSS as needed.

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">Item 1</li>
  <li class="table-view-cell">Item 2</li>
  <li class="table-view-divider">Divider</li>
  <li class="table-view-cell">Item 3</li>
</ul>
{% endhighlight %}


## Carded table views

Use `.card` to wrap any content in a padded element.

{% highlight html %}
<div class="card">
  <ul class="table-view">
    <li class="table-view-cell">Item 1</li>
    <li class="table-view-cell">Item 2</li>
    <li class="table-view-cell table-view-divider">Divider</li>
    <li class="table-view-cell">Item 3</li>
    <li class="table-view-cell">Item 4</li>
  </ul>
</div>
{% endhighlight %}


## Table view with components

### Table view with chevrons

Chevrons should be used to indicate that the item is linked. Just apply the classes `.navigate-right` or `.navigate-left` to use a chevron.


{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">
    <a class="navigate-right">
      Item 1
    </a>
  </li>
  <li class="table-view-cell">
    <a class="navigate-right">
      Item 2
    </a>
  </li>
  <li class="table-view-cell">
    <a class="navigate-right">
      Item 3
    </a>
  </li>
</ul>
{% endhighlight %}
**Note**: Table views with the Android theme don't have chevrons to comply with Android Design guidelines. More information can be found [here](https://developer.android.com/design/patterns/pure-android.html).



### Table view with badges

Badges are a great way of showing data.

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">
    Item 1
    <span class="badge badge-pill">4</span>
  </li>
  <li class="table-view-cell">
    Item 2
    <span class="badge badge-pill">1</span>
  </li>
  <li class="table-view-cell">
    Item 3
    <span class="badge badge-pill">5</span>
  </li>
</ul>
{% endhighlight %}

### Table view with badges and chevrons

Feel free to use chevrons and badges together. They'll automatically positon themselves correctly.

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">
    <a class="navigate-right">
      <span class="badge badge-pill">5</span>
      Item 1
    </a>
  </li>
  <li class="table-view-cell">
    <a class="navigate-right">
      <span class="badge badge-pill">5</span>
      Item 2
    </a>
  </li>
  <li class="table-view-cell">
    <a class="navigate-right">
      <span class="badge badge-pill">5</span>
      Item 3
    </a>
  </li>
</ul>
{% endhighlight %}


### Table view with media (images)

Showing media inside table views is easy. This component to perfect for images and text.

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell media">
    <a class="navigate-right">
      <img class="media-object pull-left" src="http://placehold.it/42x42">
      <div class="media-body">
        Item 1
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet.</p>
      </div>
    </a>
  </li>
  <li class="table-view-cell media">
    <a class="navigate-right">
      <img class="media-object pull-left" src="http://placehold.it/42x42">
      <div class="media-body">
        Item 1
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet.</p>
      </div>
    </a>
  </li>
  <li class="table-view-cell media">
    <a class="navigate-right">
      <img class="media-object pull-left" src="http://placehold.it/42x42">
      <div class="media-body">
        Item 1
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet.</p>
      </div>
    </a>
  </li>
</ul>
{% endhighlight %}

### Table view with media (icons)

Ratchicons can also used instead of images.

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell media">
    <a class="navigate-right">
      <span class="media-object pull-left icon icon-trash"></span>
      <div class="media-body">
        Item 1
      </div>
    </a>
  </li>
  <li class="table-view-cell media">
    <a class="navigate-right">
      <span class="media-object pull-left icon icon-gear"></span>
      <div class="media-body">
        Item 2
      </div>
    </a>
  </li>
  <li class="table-view-cell media">
    <a class="navigate-right">
      <span class="media-object pull-left icon icon-pages"></span>
      <div class="media-body">
        Item 3
      </div>
    </a>
  </li>
</ul>
{% endhighlight %}

### Table view with buttons

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">Item 1 <button class="btn btn-secondary">Button</button></li>
  <li class="table-view-cell">Item 2 <button class="btn btn-primary">Button</button></li>
  <li class="table-view-cell">Item 3 <button class="btn btn-success">Button</button></li>
  <li class="table-view-cell">Item 4 <button class="btn btn-danger">Button</button></li>
</ul>
{% endhighlight %}


### Table view with switch

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">
    Item 1
    <div data-toggle="switch" class="switch">
      <div class="switch-handle"></div>
    </div>
  </li>
  <li class="table-view-cell">
    Item 2
    <div data-toggle="switch" class="switch active">
      <div class="switch-handle"></div>
    </div>
  </li>
  <li class="table-view-cell">
    Item 3
    <div data-toggle="switch" class="switch">
      <div class="switch-handle"></div>
    </div>
  </li>
</ul>
{% endhighlight %}


### Table view with select

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">
    Item 1
    <div class="select">
      <select>
        <option>Blue</option>
        <option selected>Green</option>
        <option>Red</option>
      </select>
    </div>
  </li>
  <li class="table-view-cell">
    Item 2
    <div class="select">
      <select>
        <option>Blue</option>
        <option selected>Green</option>
        <option>Red</option>
      </select>
    </div>
  </li>
  <li class="table-view-cell">
    Item 3
    <div class="select">
      <select>
        <option>Blue</option>
        <option selected>Green</option>
        <option>Red</option>
      </select>
    </div>
  </li>
</ul>
{% endhighlight %}


### Table view with checkbox

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell checkbox">
    <label class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Check Item 1</span>
    </label>
  </li>
  <li class="table-view-cell checkbox">
    <label class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" checked>
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Check Item 2</span>
    </label>
  </li>
  <li class="table-view-cell checkbox">
    <label class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Check Item 3</span>
    </label>
  </li>
</ul>
{% endhighlight %}

### Table view with radio

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell radio">
    <label class="custom-control custom-radio">
      <input id="radio1" name="radio" type="radio" class="custom-control-input">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Radio Item 1</span>
    </label>
  </li>
  <li class="table-view-cell radio">
    <label class="custom-control custom-radio">
      <input id="radio2" name="radio" type="radio" class="custom-control-input" checked>
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Radio Item 2</span>
    </label>
  </li>
  <li class="table-view-cell radio">
    <label class="custom-control custom-radio">
      <input id="radio3" name="radio" type="radio" class="custom-control-input">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Radio Item 3</span>
    </label>
  </li>
  <li class="table-view-cell radio">
    <label class="custom-control custom-radio">
      <input id="radio3" name="radio" type="radio" class="custom-control-input" disabled>
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">Radio Item 4 (disabled)</span>
    </label>
  </li>
</ul>
{% endhighlight %}

### Table view with controls and chevrons

{% highlight html %}
<ul class="table-view">
  <li class="table-view-divider">checkboxs</li>
  <li class="table-view-cell control">
    <label class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input">
      <span class="custom-control-indicator"></span>
    </label>
    <a class="navigate-right">
      Item 1
      <p>..</p>
    </a>
  </li>
  <li class="table-view-cell control">
    <label class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" checked>
      <span class="custom-control-indicator"></span>
    </label>
    <a class="navigate-right">
      Item 2
      <p>..</p>
    </a>
    </a>
  </li>
  <li class="table-view-divider">radios</li>
  <li class="table-view-cell control">
    <label class="custom-control custom-radio">
      <input id="radio1" name="radio" type="radio" class="custom-control-input">
      <span class="custom-control-indicator"></span>
    </label>
    <a class="navigate-right">
      Item 1
    </a>
  </li>
  <li class="table-view-cell control">
    <label class="custom-control custom-radio">
      <input id="radio2" name="radio" type="radio" class="custom-control-input" checked>
      <span class="custom-control-indicator"></span>
    </label>
    <a class="navigate-right">
      Item 2
    </a>
  </li>

</ul>

{% endhighlight %}


## Nesting
Table view components can also be nested until 4 depth.
{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">
    Item 1

    <!-- 2depth -->
    <ul class="table-view">
      <li class="table-view-cell">
        Item 1-1

        <!-- 3depth -->
        <ul class="table-view">
          <li class="table-view-cell">
            Item 1-1-1

            <!-- 4depth -->
            <ul class="table-view">
              <li class="table-view-cell">
                Item 1-1-1-1
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="table-view-cell">Item 1-2</li>
      <li class="table-view-cell">Item 1-3</li>
    </ul>
  </li>
  <li class="table-view-cell">Item 2</li>
  <li class="table-view-cell">Item 3</li>
</ul>
{% endhighlight %}


### Nesting table view with media

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell media">
    <a class="navigate-right">
      <img class="media-object pull-left" src="http://placehold.it/42x42">
      <div class="media-body">
        Item 1
        <p>...</p>
      </div>
    </a>

    <!-- 2depth -->
    <ul class="table-view">
      <li class="table-view-cell media">
        <a class="navigate-right">
          <img class="media-object pull-left" src="http://placehold.it/42x42">
          <div class="media-body">
            Item 1-1
            <p>...</p>
          </div>
        </a>
      </li>
      ..
    </ul>

  </li>
  <li class="table-view-cell media">
    <a class="navigate-right">
      <img class="media-object pull-left" src="http://placehold.it/42x42">
      <div class="media-body">
        Item 2
        <p>..</p>
      </div>
    </a>
  </li>
</ul>
{% endhighlight %}

## Color schemes

### Invert the colors

You can also invert the colors with light text on dark backgrounds with `.table-view-inverse`.

{% highlight html %}
<ul class="table-view table-view-inverse">
  ...
</ul>
{% endhighlight %}

### Contextual classes
Use contextual classes to color table view cells.

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell table-view-active">...</li>
  <li class="table-view-cell table-view-success">...</li>
  <li class="table-view-cell table-view-info">...</li>
  <li class="table-view-cell table-view-warning">...</li>
  <li class="table-view-cell table-view-danger">...</li>
</ul>
{% endhighlight %}

or

{% highlight html %}
<ul class="table-view table-view-active">
  ...
</ul>
{% endhighlight %}

### Background utilities
Regular table background variants are not available with the inverse table, however, you may use [text or background utilities](/components/utilities/#contextual-colors-and-backgrounds) to achieve similar styles.

{% highlight html %}
<ul class="table-view table-view-inverse">
  <li class="table-view-cell bg-primary">...</li>
  <li class="table-view-cell bg-success">...</li>
  <li class="table-view-cell bg-info">...</li>
  <li class="table-view-cell bg-warning">...</li>
  <li class="table-view-cell bg-danger">...</li>
</ul>
{% endhighlight %}

or

{% highlight html %}
<ul class="table-view table-view-inverse bg-primary">
  ...
</ul>
{% endhighlight %}
