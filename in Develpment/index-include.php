<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Acerca de | Language Creativity and Identity</title>
  <!-- responsive view port -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Favicon -->
  <link rel="icon" href="img/favicon.ico" type="image/x-icon">
  <!-- css -->
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <!-- <link rel="stylesheet" href="http://normalize-css.googlecode.com/svn/trunk/normalize.css"> -->
  <!-- MAIN CSS -->
  <link rel="stylesheet" href="https://dl.dropbox.com/s/adpiwnda2oe3owi/main.css?dl=0">
  <!-- jQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <!-- javaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  <!-- Tabletop.js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.1/tabletop.min.js"></script>
  <script src="js/dynamic-home.js" ></script>
  <script src="js/main.js" ></script>

</head>
<body id="body-about">
  <!-- HEADER -->

  <?php include_once('./header.html') ?>

  <!-- END-HEADER -->

  <!-- BODY-CONTENT -->
  <main>
    <!-- CAROUSEL -->
    <div class="container-fluid" id="slider-jesuarva">
      <div class="row" >
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>

          <!-- Wrapper for slides -->
          <div class="carousel-inner">
            <div class="item active">
              <figure>
                <img src="img/nenufareshorizontal.jpg" alt="Carousel-1" class="img-resposive col-md-12 img-carousel">
              </figure>
            </div>

            <div class="item">
              <figure>
                <img src="img/delfi-de-la-Rua-Haiku-Pauwela-United-States.jpeg" alt="Carousel-2" class="img-resposive col-md-12 img-carousel">
              </figure>
            </div>

            <div class="item">
              <figure>
                <img src="img/Jan-Schulz--Webdesigner-Stuttgart.jpeg" alt="Carousel-3" class="img-resposive col-md-12 img-carousel">
              </figure>
            </div>
          </div>
          <!-- Left and right controls -->
          <!-- <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
          </a> -->
      </div>
      </div>
    </div>
    <!-- END-CAROUSEL -->

    <!-- TEXT -->
    <div id="español" class="container español" >
    </div>
    <div id="ingles" class="container ingles noVisible">
    </div>
    <!-- END TEXT -->
    <!-- LOGO -->
    <div class="container logo-excelencia-container">
      <img class="logo-excelencia" src="img/logo_excelencia_uam_fyl.jpg" alt="">
    </div>
    <!-- END LOGO -->
  </main>
  <!-- END-BODY-CONTENT -->

  <!-- FOOTER -->
  <div class="container">
    <div class="custom-hr-container col-md-12">
      <hr class="custom-hr">
    </div>
  </div>
  <footer class="container footer-container">
    <p class="pull-right"><a href="#">Back to top</a></p>
    <p>&copy;  2017  &middot;
      <a href="mailto:projects@digital-speck.com?Subject='Información desarrollo web'">Web design: digital-speck.com</a>
      <!-- <a href="#">Privacy</a>  &middot;
      <a href="#">Terms</a> -->
    </p>
  </footer>
  <!-- END-FOOTER -->
</body>
</html>
