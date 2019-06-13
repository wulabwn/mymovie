function searchMovie(){


		$('#movie-list').html('');

	$.ajax({
		url:'http://omdbapi.com',
		type : 'get',
		dataType:'json',
		data:{
			'apikey':'',
			's':$('#search-input').val()
		},

		success: function(result){
			
			if(result.Response =="True"){

				let movies = result.Search;
				//console.log(result);

				$.each(movies, function(i, hasil){

					$('#movie-list').append(`
						<div class="col-md-4  mt-3">
							<div class="card" style="width: 18rem;">
							  <img src="`+hasil.Poster+`" class="card-img-top" alt="...">
							    <div class="card-body">
							    <h5 class="card-title">`+ hasil.Title+`</h5>
							    <h6 class="card-subtitle mb-2 text-muted">`+ hasil.Year+`</h6>
							     <a href="#" class="btn btn-primary see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+hasil.imdbID+`">See More</a>
							  </div>
							</div>
						</div>
						`)

				})


			}else{
				$('#movie-list').html(`
					<div class="col">
					<h1 class="text-center">` + result.Error + `</h1>
					</div>`);
			}

		}
	});

}


$('#search-button').on('click',function(){

	// $.getJSON('http://www.omdbapi.com?apikey=b8a2e0ff&s');

	searchMovie();

});

$('#search-input').on('keyup',function(event){
    // bisa pake if(e.which) {
	if(event.which === 13){  
		searchMovie();
	}
	
});

// fungsi dibawah ini gak bisa berjalan karena see detail itu belom , see detail ada-
//setelah movie list keluar jadi function dibawah ini tidak tahu 

// $('.see-detail').on('click', function(){

// 	console.log($(this).data('id')); // cara negecheck apakah data bisa ke ambil melalui id ini

// });


//   ----> ini salah satu cara agar hambatan di atas bisa di atasi 

$('#movie-list').on('click','.see-detail', function(){

	// console.log($(this).data('id')); // cara negecheck apakah data bisa ke ambil melalui id ini

	$.ajax({
		url:'http://omdbapi.com',
		type : 'get',
		dataType:'json',
		data:{
			'apikey':'b8a2e0ff',
			'i':$(this).data('id')
		},

		success : function(movie){
			if(movie.Response === "True"){
				$('.modal-body').html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="`+movie.Poster +`"  class="img-fluid">
							</div>

							<div class="col-md-8">
								<ul class="list-group">
  									<li class="list-group-item"><h1> <b>`+movie.Title+`</h1> </b></li>
  									<li class="list-group-item"><b>Released </b>:  `+movie.Released+`</li>
  									<li class="list-group-item"><b>Year </b>: `+movie.Year+`</li>
  									<li class="list-group-item"><b>Runtime </b>: `+movie.Runtime+`</li>
  									<li class="list-group-item"><b>Genre</b> : `+movie.Genre+`</li>
  									<li class="list-group-item"><b>Plot</b> : `+movie.Plot+`</li>
  									<li class="list-group-item"><b>Country</b> : `+movie.Country+`</li>
								</ul>
							</div>
						</div>
					</div>

					`);
			}
		}
	})

});

