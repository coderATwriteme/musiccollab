$(document).on('ready', function() {


	//////  helper functions   /////////////////////////////////

	var lowerCase = function(x){
		if ($.isArray(x) === true){
			for (var y = 0; y < x.length; y++){
				x[y] = x[y].toLowerCase();
			}
			return x;
		} else if (x) {
			var lowerCased = x.toLowerCase();
			return lowerCased;
			}
		};

	var capitolizeFirst = function(string) {
		var split = string.split(' ');
		for (var i = 0; i < split.length; i++){
			split[i] = split[i].charAt(0).toUpperCase() + split[i].substr(1);
		}
		split = split.join(' ');
		return split;
	};

	var ageConvert = function(birthdate) {
		var birthday = birthdate;
		birthday = birthday.split('-');
		var now = new Date();
		var year = now.getYear() + 1900;
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var today =[];
		today.push(year, month, date);
		for (var i = 0; i < birthday.length; i++) {
			birthday[i] = Number(birthday[i]);
		};
		var age = today[0] - birthday[0];
		if (birthday[1] >= today[1] && birthday[2] > today[2]) {
			age--;
		}
		return age;
	};

	// capricorn 12-22 1-19
	// aquarius 1-20 2-19
	// pisces 2-20 3-20
	// aries 3-21 4-19
	// taurus 4-20 5-20
	// gemini 5-21 6-20
	// cancer 6-21 7-22
	// leo 7-23 8-22
	// virgo 8-23 9-22
	// libra 9-23 10-23
	// scorpio 10-24 11-22 
	// sagittarius 11-23 12-21

	var astroConvert = function(birthdate) {
		var birthday = birthdate;
		birthday = birthday.split('-');
		birthday.shift();
			for (var i = 0; i < birthday.length; i++) {
				birthday[i] = Number(birthday[i]);
			};
		console.log('birthday: ', birthday);
		if ((birthday[0] === 12 && birthday[1] >= 22) || (birthday[0] === 1 && birthday[1] <= 19)) {
			var sign = 'Capricorn';
		} else if ((birthday[0] === 1 && birthday[1] >= 20) || (birthday[0] === 2 && birthday[1] <= 19)) {
			var sign = 'Aquarius';
		} else if ((birthday[0] === 2 && birthday[1] >= 20) || (birthday[0] === 3 && birthday[1] <= 20)) {
			var sign = 'Pisces';
		} else if ((birthday[0] === 3 && birthday[1] >= 21) || (birthday[0] === 4 && birthday[1] <= 19)) {
			var sign = 'Aries';
		} else if ((birthday[0] === 4 && birthday[1] >= 20) || (birthday[0] === 5 && birthday[1] <= 20)) {
			var sign = 'Taurus';
		} else if ((birthday[0] === 5 && birthday[1] >= 21) || (birthday[0] === 6 && birthday[1] <= 20)) {
			var sign = 'Gemini';
		} else if ((birthday[0] === 6 && birthday[1] >= 21) || (birthday[0] === 7 && birthday[1] <= 22)) {
			var sign = 'Cancer';
		} else if ((birthday[0] === 7 && birthday[1] >= 23) || (birthday[0] === 8 && birthday[1] <= 22)) {
			var sign = 'Leo';
		} else if ((birthday[0] === 8 && birthday[1] >= 23) || (birthday[0] === 9 && birthday[1] <= 22)) {
			var sign = 'Virgo';
		} else if ((birthday[0] === 9 && birthday[1] >= 23) || (birthday[0] === 10 && birthday[1] <= 24)) {
			var sign = 'Libra';
		} else if ((birthday[0] === 10 && birthday[1] >= 24) || (birthday[0] === 11 && birthday[1] <= 22)) {
			var sign = 'Scorpio';
		} else if ((birthday[0] === 11 && birthday[1] >= 23) || (birthday[0] === 12 && birthday[1] <= 21)) {
			var sign = 'Sagittarius';
		} 
		console.log('sign: ', sign);
		return sign;  
	};


////////////////////////////////////////////////////////////////////////
////////////////////// profile page///////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////// profile page///////////////////////////////




//////// photo gallery

	var gallery = $('<div class="gallery-background"><div class="gallery"><h3 class="gallery-heading">Photo Gallery</h3></div></div>');

	$(document).on('click', '.view-gallery', function(){
		$('.container').append(gallery);
	});


	

	/////////////// Profile-user edit//////////////////////////////
////////////////////////////////////////////////////////////////////////

////////////////  welcome new user //////

$('.close-welcome').on('click', function(){
	$.post('/api/isNewUserFalse', function(responseData){
		console.log('responseData:', responseData);
	});
	$('#welcome').addClass('hide');
});



function editProfile(){
		$('.edit-add-shadow').addClass('shadow');
		$('.empty').addClass('hide');
		// $(document).remove('.empty');

		$('#improvCompRange').removeClass('hide');

		/// add class to target individual words
		$('.sidebar-list-text').addClass('words');
		$('.sidebar-list-text').addClass('editing-profile');
		$('.words').append('<button class="btn btn-default btn-xs delete-word">X</button>');

		/// add visual to show editing with editing-profile, edit is just to target them, no visual...
		$('.words, .about, .philosophy').addClass('editing-profile');
		$('.about, .philosophy').addClass('edit');
		$('.location').addClass('edit');

	///// switch button up...
		$('.edit-profile').removeClass('edit-profile btn-xs').addClass('edit-done btn-md btn-danger').text('Done Editing');
		$(this).blur();

		//// add media
		$('#addMedia').removeClass('hide');

		$('.ratio-graph').hide();
		$('.ratio-graph').after('<input type="range" id="edit-ratio">');

		//// add inputs
		$('.info-edit').append('<input type="text" class="sidebar-list-text add-new-word editing-profile edit" placeholder="Add+">');

		var textareaAbout = $('<textarea class="about-content add-new-text editing-profile edit" placeholder="Add+">');
		var textareaPhilosophy = $('<textarea class="about-content add-new-text editing-profile edit" placeholder="Add+">');
		$('.info-edit-textarea').empty();
		$('#about').append(textareaAbout);
		$('#about textarea').val(user.about);
		$('#philosophy').append(textareaPhilosophy);
		$('#philosophy textarea').val(user.philosophy);

		// /// birthday edit
		// $('#birthdate').append('<input type="date" name="birthdate">');

	};

	if (user.isNewUser === true && user._id === currentUser){
		editProfile();
	}


///////////// append media items /////
	(user.media).map(function(media){
		if (user.media.length > 0){
			$('#no-media').remove();
			$('#media').append('<div class="media-item">' + media + '</div>');
		}
	});

	$(document).on('click', '#view-media', function(){
	$('#media').toggle('.reveal');
});



/////////// edit profile ////////////////////


	$(document).on('click', '.edit-profile', function(){
		editProfile();
	});

////////////// delete items from user
	$(document).on('click', '.delete-word', function(){
		
		var val = $(this).closest('p').text();
		val = val.substr(0, val.length-1);
		var attr = $(this).closest('.sidebar-list').attr('title');
		console.log('val', val);
		console.log('attr', attr);
		var attrArray = user[attr];
		var updatedArray = [];
		for (var i = 0; i < attrArray.length; i++){
			if (attrArray[i] !== val) {
				updatedArray.push(attrArray[i]);
			}
		}
		user[attr] = updatedArray;
		console.log('user delete word: ', user[attr]);
		$(this).closest('.words').remove();
		
	});


		$(document).on('blur', '.add-new-word', function(){
			if ($(this).val() !== ''){
				var val = $(this).val();
				var attr = $(this).closest('.sidebar-list').attr('title');
				console.log('attr: ', attr);
				$(this).closest('.sidebar-list').append('<p class="sidebar-list-text words editing-profile edit">' + val +'</p>');
				$(this).closest('.sidebar-list').find('.words').last().append('<button class="btn btn-default btn-xs delete-word">X</button>');
				$(this).closest('.sidebar-list').append('<input autofocus type="text" class="sidebar-list-text add-new-word editing-profile edit" placeholder="Add+">');

				///// hacked way of getting info...
				// var updatedInfo = $(this).closest('.sidebar-list-text').text().split('X');
				// updatedInfo.pop();
				// updatedInfo = updatedInfo.join(', ');
				// console.log('updatedInfo: ', updatedInfo);
				user[attr].push(val);
				console.log(user);

				// user[attr].push(val);

				$(this).remove();
				
			}
		});

		$(document).on('click', '.edit', function(){
			$(this).attr('contenteditable', 'true');
			$(this).focus();

		});
		$(document).on('blur', '.add-new-text', function(){
			if ($(this).val() !== ''){
				console.log('this', this);
				var val = $(this).val();
				var attr = $(this).closest('.info-block').attr('title');
				console.log('attr: ', attr);
				user[attr] = val;
				console.log(user);

				// user[attr].push(val);
				// $(this).closest('.content-container').append('<p class="about-content words editing-profile edit">' + val +'</p>');
				// $(this).closest('.content-container').append('<input type="text" class="about-content add-new-word editing-profile edit" placeholder="Add+">');
				///// hacked way of getting info...
				// var updatedInfo = $(this).closest('.sidebar-list-text').text().split('X');
				// updatedInfo.pop();
				// updatedInfo = updatedInfo.join(', ');
				// console.log('updatedInfo: ', updatedInfo);

				// $(this).remove();

				
			}
		});

		//////////////// add media /////////
		$('#submit-media').on('submit', function(e){
			e.preventDefault();
			var media = $('#submit-media').find('[name=media]').val();
			console.log('media: ', media);
			$('#media').append('<div class="media-item">' + media + '</div>');
			$('#submit-media').find('[name=media]').val('');
			$.post('/api/addMedia', {media: media}, function(response){
				console.log(response);
			});
			var responseData = $.ajax({
			type: "POST",
			data: {
				media: media
			},
			url: '/api/addMedia',
			traditional: true
			})
			.error(function(){
				console.log('error');
			})
			.done(function(err, result){
				console.log('media added.');
			});
		});


		


////// edit about and philosophy ////
		$('.about, .philosophy').on('blur', function(){
			var attr = $(this).closest('.info-block').attr('title');
			var text = $(this).text();
			user[attr] = text;
			console.log('user updated about philosophy: ', user);
		});

//////// edit improv comp  //////////
		$('#improvCompRange').change(function(){
			user.improvComp = $(this).text();
			console.log(user);
			$('#comp').text($(this).text());
			$('#improv').text(100 - $(this).text());
			$('#improvComp').attr('value', $(this).text());
			$('#ratio-bar-signup').attr("style", "width: " + $(this).text() + "%");
			$('#ratio-bar-signup2').attr("style", "width: " + (100 - $(this).text()) + "%");
		});


		

////////////// done editing ///////////////////
  	
	  	$(document).on('click', '.edit-done, .close-welcome', function(){
	  		////// remove all the many editing classes...
	  		$('.edit-add-shadow').removeClass('shadow');
	  		$('.edit').attr('contenteditable', 'false');
			$('.sidebar-list-text, .words, .name-loc, .about, .philosophy').removeClass('editing-profile edit');
			$('.name, .location, .band').removeClass('edit');

			$('#about').empty();
			$('#about').append('<p class="about-content">' + user.about +'</p>');
			$('#philosophy').empty();
			$('#philosophy').append('<p class="about-content">' + user.philosophy +'</p>');

			$('#improvCompRange, #addMedia').addClass('hide');

			///// return edit button to original state
			$('.edit-done').addClass('edit-profile btn-xs').removeClass('edit-done btn-md btn-danger').text('Edit Profile');

			$('.delete-word').hide();
			$('.ratio-graph').show();
			
			var ratioValue = $('#edit-ratio').val() * 2;
			console.log('ratioValue: ', ratioValue);
			$('#ratio-bar').css({
				width: ratioValue
			});
			$('#edit-ratio').hide();
			$('.add-new-word').remove();


			$.post('/api/updateUserProfile', user, function(responseData){
				console.log('user saved');
			});

			var attributes = ['bands', 'instruments', 'styles', 'skills', 'inspirations'];
			attributes.map(function(attr){
				console.log('user[attr].length: ', user[attr].length);
				if (user[attr].length === 0){
					console.log('is empty');
					var empty = $('[title=' + attr + ']').find('p');
					console.log('empty: ', empty);
					$(empty).removeClass('hide');
					
				}
			});
		});

	// });

/////////////////////// uploading images ////////////////////////


///// uploading spinning image //////////

$('#uploadProfilePicButton').on('click', function(e){
	$('#uploadingProfilePic').removeClass('hide');
	$(this).addClass('hide');
	$('#close').addClass('hide');
});

$('#uploadBackgroundPicButton').on('click', function(e){
	$('#uploadingBackgroundPic').removeClass('hide');
	$(this).addClass('hide');
	$('#close-b').addClass('hide');
});

////////// hover to edit photos  ////////

$('.profile-pic').hover(
	function(){
		$('#uploadProfilePic').removeClass('hide');
	},
	function(){
		$('#uploadProfilePic').addClass('hide');
	}
);

$('.profile-top').hover(
	function(){
		$('#uploadBackgroundPic').removeClass('hide');
	},
	function(){
		$('#uploadBackgroundPic').addClass('hide');
	}
);






	///////  add user to tribe /////////

	$('#btn-connect').on('click', function(){
		console.log('click');
		$.post('/addUserToTribe', {}, function(responseData){
			console.log('responseData: ', responseData);
		});
	});




/////////////////////// posting ////////////////////////


/////// post templating ///////////

var postTemplate = $('#post-template').html();
	var compilePostTemplate = Handlebars.compile(postTemplate);


/////////////// submitting posts  ///////////////

// $(document).on('click', '.drop-note', function(){
// 	console.log('click');
// 	$('#addPost').css({display: 'inherit'});
// 	$('#dropNote').text('Cancel').addClass('cancel').removeClass('drop-note');
// });

// $(document).on('click', '.cancel', function(){
// 	$('#addPost').css({display: 'none'});
// 	$('#dropNote').text('Drop a Note').removeClass('cancel').addClass('drop-note');
// });

// $('#addPost').on('submit', function(e){
// 	e.preventDefault();
// 	var text = $(this).find('textarea').val();
// 	var date = moment().format('MMMM Do YYYY, h:mm:ss a');
// 	var post = {
// 		date: date,
// 		text: text,
// 		likes: 0,
// 		userName: currentUser.name || user.name,
// 		userProfilePic: currentUser.profilePic || user.profilePic
// 	};

// 	$.post('/api/addPost', post , function(responseData){
// 		console.log('addpost responseData: ', responseData);
// 	});

// 	var outputHTML = compilePostTemplate(post);
// 	$('#post-container').prepend(outputHTML);

// 	$('#addPost').css({display: 'none'});
// 	$('#dropNote').text('Drop a Note').removeClass('cancel').addClass('drop-note');
// });

////// on page load, display previous posts
// if (user['posts'].length > 0){
// 	console.log('there are posts...');
// 	user.posts.map(function(post){
// 			var outputHTML = compilePostTemplate(post);
// 			$('#post-container').prepend(outputHTML);
// 		});
// }

$.post('/api/getPosts', {_id: user._id}, function(response){
	console.log('asking for posts...');
	console.log('response.user: ', response.posts);
	response.posts.map(function(post){
		var outputHTML = compilePostTemplate(post);
		$('#post-container').prepend(outputHTML);
	});
});

////// connect and add user to tribe ///////////

$('#btn-connect').on('click', function(){
	var userIdToAdd = $(this).attr('value');
	console.log('userIdToAdd: ', userIdToAdd);
	$.post('/api/addToTribe', {userIdToAdd: userIdToAdd}, function(response){
		console.log('response: ', response);
	});
	$('#song-tribe-sidebar').append('<div class="connected">Connected</div>');
	$(this).remove();
});

//// either show connect button or display connected

if (user._id !== currentUser){
	for (var i = 0; i < currentUser.tribe.length; i++){
		console.log(currentUser.tribe[i], 'test');
		console.log(user._id), 'test';
		if (currentUser.tribe[i] === user._id){
			$('#song-tribe-sidebar').append('<div class="connected">Connected</div>');
			$('#btn-connect').remove();

		}
	}
}

////////// view tribe members ////////

var userTemplate = $('#user-template').html();
var compileTemplate = Handlebars.compile(userTemplate);

$('#view-tribe').on('click', function(){
	$(this).addClass('clear-tribe-view');
	$('#tribe-view').toggle('.reveal');
	$.post('/api/getTribe', {_id: user._id}, function(responseData){
		console.log('getTribe responseData: ', responseData);
		var tr = responseData;
		console.log('tr: ', tr);
		var tribe = tr.tribe;
		console.log('????: ', tribe, tr, tr.tribe);
		tribe.map(function(usr){
			console.log('mapping...', usr.name);
			var u = {
				name: usr.name,
				profilePic: usr.profilePic,
				_id: usr._id,
				location: usr.location
			};
			console.log('u: ', u);
			var outputHTML = compileTemplate(u);
			$('#tribe-container').append(outputHTML);
		});
	});
});

$(document).on('click', '.clear-tribe-view', function(){
	$(this).removeClass('.clear-tribe-view');
	$('#tribe-container').empty();
});

$(document).on('click', '.clear-tribe-view-close', function(){
	$('#tribe-view').toggle('.reveal');
	$('#tribe-container').empty();
});




});