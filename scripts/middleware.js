/*
* basic script
*/

var App = {};

App.Titles = ['Как это работает', 
				'Воронка', 
				'Отправка уведомлений', 
				'Мониторинг ошибок',
				'Конструктор дашбордов'];

App.Slides = ['slide0', 'slide1', 'slide2', 'slide3', 'slide4'];

App.Current = 0;

App.img_path = 'images/';

App.prev_title = $('#prev_title');
App.curr_title = $('#current_title');
App.next_title = $('#next_title');

App.curr_slide = $('#curr_slide');
App.new_slide = $('<div></div>');
$(App.new_slide).addClass('slide');

App.SlideContainer = $('#slide_container');

App.clicked = false;

$(function(){
		
	$(App.curr_slide).css('background-image', 'url(' + App.img_path + App.Slides[App.Current] + '.png)');

	//if Safari
	try{
		if (navigator.appVersion.indexOf("Mac")!=-1){
		
			$('.title,.title_center').width(270);
		} 
	}catch(e){console.log(e)}
		
	App.left = $('#arrow_left');
	App.right = $('#arrow_right');

	App.timerListing = setInterval(function(){
		$(App.right).trigger('click');
	},7000);

	$(App.left).on('click', function(){
		if(App.clicked) return;
		else App.clicked = true;

		clearInterval(App.timerListing);

		// //set pointer on list
		if(App.Current > 0)
			App.Current--;
		else
			App.Current = App.Titles.length - 1;
		
		slide_go('right');

	});

	$(App.right).on('click', function(){
		if(App.clicked) return;
		else App.clicked = true;

		clearInterval(App.timerListing);

		//set pointer on list
		if(App.Current < (App.Titles.length - 1))
			App.Current++;
		else
			App.Current = 0;
				
		slide_go('left');
	
	});

});


function titles_replace(){
	var len = App.Titles.length;

	App.Prev = App.Current > 0 ? App.Current - 1 : len - 1;
	App.Next = App.Current < len - 1 ? App.Current + 1 : 0;

	$(App.prev_title).text(App.Titles[App.Prev]);
	$(App.curr_title).text(App.Titles[App.Current]);
	$(App.next_title).text(App.Titles[App.Next]);

	//$(App.curr_title).animateAuto('width', 500);

	App.timerListing = setInterval(function(){
		$(App.right).trigger('click');
	},7000);

	App.clicked = false;
	
};

function slide_go(vect){

	App.new_slide = $(App.new_slide).clone();

	$(App.SlideContainer).append(App.new_slide);
	$(App.new_slide).css('background-image', 'url(' + App.img_path + App.Slides[App.Current] + '.png)')
		
	var slide_width = $(App.curr_slide).width();

	if(vect == 'left'){
		$(App.new_slide).css({'left': slide_width, opacity: 0.2});
		//$(App.curr_slide).animate({'right': slide_width, opacity: 0}, 500);
		$(App.curr_slide).animate({opacity: 0}, 500);
		$(App.new_slide).animate({'left': 0, opacity: 1}, 500, function(){
			App.curr_slide.remove();
			App.curr_slide = App.new_slide;

			titles_replace();
		});
		
	}

	if(vect == 'right'){
		$(App.new_slide).css({'left': -slide_width, opacity: 0.2});
		$(App.curr_slide).animate({opacity: 0}, 500);
		$(App.new_slide).animate({'left': 0, opacity: 1}, 500, function(){
			App.curr_slide.remove();
			App.curr_slide = App.new_slide;
			
			titles_replace();
		});
	}

	switch(App.Current){
		case 1:
			$(App.SlideContainer).attr('rel', 'net1');
		break;

		case 2:
			$(App.SlideContainer).attr('rel', 'net2');
		break;

		case 3:
			$(App.SlideContainer).attr('rel', 'net3');
		break;

		default:
		//remove rel attr
			$(App.SlideContainer).attr('rel', '');
		break;
	}

	
};


/*
* animate element size to 'auto'
*/
jQuery.fn.animateAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo(".header");
        height = elem.css("height"),
        width = elem.css("width"),
        elem.remove();

        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);  
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);

    });  
}
