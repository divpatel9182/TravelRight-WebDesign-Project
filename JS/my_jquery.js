var slideIndex = 1;
var blogPage = 0;
var blogs = [];

$(document).ready(function() {

    showSlides(slideIndex);
    loadBanners();
    loadBlog(blogPage);
    $(".load-more").click(function() {
        loadBlog(blogPage);
    });
});

function loadBlog(page) {
    $.getJSON("../resources/blogs" + (page + 1) + ".json",
        function(data) {
            var newBlogs = data.blogs;
            blogs = blogs.concat(newBlogs);
            var tempBlog = document.getElementById("article-template").cloneNode(true);
            var tempFragment = document.createDocumentFragment();
            if (page === 0) {
                $("#article-container").empty();
            }
            $.each(newBlogs, function(index, value) {
                var newTempBlog = tempBlog.cloneNode(true);
                newTempBlog.querySelector("img").src = value.image_url;
                newTempBlog.querySelector("img").title = value.title;
                newTempBlog.querySelector("img").alt = value.title;
                newTempBlog.querySelector("p").textContent = value.discription;
                newTempBlog.querySelector("a").setAttribute("onclick", "showArticle(" + value.id + ")");
                tempFragment.append(newTempBlog);
            });
            document.getElementById("article-container").appendChild(tempFragment);
            delete tempFragment;
            blogPage++;
            if (blogs.length >= data.total_item_count) {
                hideLoadMore();
            }
        }
    ).fail(function() {
        console.log("An error has occurred")
    });
}

function hideLoadMore() {
    $("div.load-more").hide();
}

function loadBanners() {
    $.getJSON("../resources/banners.json",
        function(data) {
            var banners = data.banners;
            banners.sort((a, b) => a.priority - b.priority);
            var tempSlide1 = document.getElementById("slide-template").cloneNode(true);
            var tempDot1 = document.getElementById("dot-template").cloneNode(true);
            var slideFragment = document.createDocumentFragment();
            var dotFragment = document.createDocumentFragment();
            $("#dot-container").empty();
            $("#slide-template").remove();
            $.each(banners, function(index, value) {
                var tempSlide = tempSlide1.cloneNode(true);
                var tempDot = tempDot1.cloneNode(true);
                tempSlide.querySelector("img").src = value.url;
                tempSlide.querySelector("img").title = value.name;
                tempSlide.querySelector("img").alt = value.name;
                tempSlide.querySelector("div.text").textContent = value.text;
                slideFragment.append(tempSlide);
                tempDot.setAttribute("onclick", "currentSlide(" + (index + 1) + ")");
                dotFragment.append(tempDot);
            });
            document.getElementById("dot-container").appendChild(dotFragment);
            document.getElementById("slideshow-container").appendChild(slideFragment);

            delete dotFragment;
            delete slideFragment;
            slideIndex = 1;
            showSlides(slideIndex);
        }
    ).fail(function() {
        console.log("An error has occurred")
    });
}

function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

function currentSlide(n) {
    slideIndex = n
    showSlides(slideIndex);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}