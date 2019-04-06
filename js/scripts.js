$.getJSON("/homm3_wiki/json/navigation.json", function(data) {
    for (var i = 0; i < data.navigation.length; i++) {
        $("nav").append('<a class="dropdown-btn">' + data.navigation[i].main + '</a>');
        if (data.navigation[i].sub.length != 0) {
            var subs = [];
            for (var j = 0; j < data.navigation[i].sub.length; j++) {
                subs.push('<a href="' + data.navigation[i].sub[j][1] + '">' + data.navigation[i].sub[j][0] + '</a>');
            }
            $("nav").append('<div class="dropdown-container">' + subs.join('<br>') + '</div>');
        }
    }
});
$(function update_navigation() {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    for (var i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
});
$(function show_popbox() {
    var moveLeft = 0;
    var moveDown = 0;
    $('.pop_target').hover(function(e) {
        var target = '#' + ($(this).attr('data-popbox'));
        switch (target) {
            case "#spellbox":
                {
                    $.getJSON("/homm3_wiki/json/spells_base.json", function(data) {
                        var item = data.spells.find(x => x.name === $(e.target).prop("alt"));
                        $("#spellbox_img").prop("src", $(e.target).prop("src"));
                        $("#spellbox_name").text(item.name);
                        $("#spellbox_lvl").text("Уровень: " + item.lvl);
                        $("#spellbox_cost").text("Стоимость: " + item.cost);
                        $("#spellbox_duration").text("Длительность: " + item.duration);
                        $("#spellbox_eff1_title").text(item.eff1_title);
                        $("#spellbox_eff1").text(item.eff1);
                        $("#spellbox_eff2_title").text(item.eff2_title);
                        $("#spellbox_eff2").text(item.eff2);
                        $("#spellbox_eff3_title").text(item.eff3_title);
                        $("#spellbox_eff3").text(item.eff3);
                        $("#spellbox_descr").text(item.descr);
                    });
                    break;
                }
            case "#classbox":
                {
                    $.getJSON("/homm3_wiki/json/classes_base.json", function(data) {
                        var item = data.classes.find(x => x.name === $(e.target).text());
                        $("#classbox_name").text(item.name);
                        $("#classbox_att").text(item.att);
                        $("#classbox_def").text(item.def);
                        $("#classbox_pwr").text(item.pwr);
                        $("#classbox_knl").text(item.knl);
                        $("#classbox_descr").text(item.descr);
                    });
                    break;
                }
            case "#specialitybox":
                {
                    $.getJSON("/homm3_wiki/json/specialities_base.json", function(data) {
                        var item = data.specialities.find(x => x.name === $(e.target).prop("alt"));
                        $("#specialitybox_img").prop("src", $(e.target).prop("src"));
                        $("#specialitybox_name").text(item.name);
                        $("#specialitybox_descr").text(item.descr);
                    });
                    break;
                }
            case "#secondaryskillbox":
                {
                    $.getJSON("/homm3_wiki/json/secondary_skills_base.json", function(data) {
                        var item = data.secondary_skills.find(x => x.name === $(e.target).prop("alt"));
                        $("#secondaryskillbox_img").prop("src", $(e.target).prop("src"));
                        $("#secondaryskillbox_name").text(item.name);
                        $("#secondaryskillbox_descr").text(item.descr);
                    });
                    break;
                }
        }
        $(target).show();
        moveLeft = $(this).outerWidth();
        moveDown = ($(target).outerHeight() / 2);
    }, function() {
        var target = '#' + ($(this).attr('data-popbox'));
        if (!($(".pop_target").hasClass("show"))) {
            $(target).hide();
        }
    });

    $('.pop_target').mousemove(function(e) {
        var target = '#' + ($(this).attr('data-popbox'));
        leftD = e.pageX + parseInt(moveLeft);
        maxRight = leftD + $(target).outerWidth();
        windowLeft = $(window).width() - 40;
        windowRight = 0;
        maxLeft = e.pageX - (parseInt(moveLeft) + $(target).outerWidth() + 20);

        if (maxRight > windowLeft && maxLeft > windowRight) {
            leftD = maxLeft;
        }

        topD = e.pageY - parseInt(moveDown);
        maxBottom = parseInt(e.pageY + parseInt(moveDown) + 20);
        windowBottom = parseInt(parseInt($(document).scrollTop()) + parseInt($(window).height()));
        maxTop = topD;
        windowTop = parseInt($(document).scrollTop());
        if (maxBottom > windowBottom) {
            topD = windowBottom - $(target).outerHeight() - 20;
        } else if (maxTop < windowTop) {
            topD = windowTop + 20;
        }

        $(target).css('top', topD).css('left', leftD);
    });
    $('.pop_target').click(function(e) {
        var target = '#' + ($(this).attr('data-popbox'));
        if (!($(this).hasClass("show"))) {
            $(target).show();
        }
        $(this).toggleClass("show");
    });
});