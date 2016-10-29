<!DOCTYPE html>
<html>
  <head>
    <title>Welcome</title>
  </head>

  <body class="pace-top bg-white">
    <div id="page-container" class="fade in">

    </div>

    {% if process.env.NODE_ENV !== "development" %}
    <script src="assets/vendor.bundle.js"></script>
    <script src="assets/main.js"></script>
    {% else %}
    <script src="http://localhost:9000/assets/vendor.bundle.js"></script>
    <script src="http://localhost:9000/assets/main.js"></script>
    {% endif %}
  </body>
</html>
