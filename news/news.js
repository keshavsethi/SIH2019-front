window.onload = function() {

	var url = 	'https://newsapi.org/v2/everything?' +
          'q=(+Tsunami OR +earthquake OR +Flood OR -technology -wifi  )&' +
          'from=2019-02-26&' +

					'language=en&' +

          'sortBy=relevancy&' +
          'apiKey=4a962541d2424b28a7c25d9cbeb9afd0';



	var xhttp = new XMLHttpRequest();


	xhttp.onreadystatechange = function() {
		if ( this.readyState == 4 && this.status == 200 ) {
			var data = JSON.parse(xhttp.responseText).articles;

			console.log(data);
			// see this line below
			var articles = data.map(mapToArticle);
			var contentDiv = document.getElementById('content');

			contentDiv.innerHTML = createTemplate(articles);
		}
	}

  xhttp.open("GET", url, true);
	xhttp.send();

	function mapToArticle(item) {
		return {
			url: item.url,
			title: item.title,
			author: item.author,
			date: item.publishedAt,
			img: item.urlToImage ? item.urlToImage : "oops.jpeg",
			description: item.description
		};
	}

  function formatTime(timestr) {
    return timestr.substr(0, 10) + ' ' + timestr.substr(11, 5);
  }

	function createTemplate(articles) {
		return articles.reduce(function(tmpl, article) {
			tmpl += `
			<article>
				<h2><a class="article-header" href="${article.url}">${article.title}</a></h2>
				<div class="row">
					<div class="col-md-4">
						<img class="img-fluid rounded mb-3" src="${article.img}"  />
					</div>
					<div class="col-md-8">
						<p class="date">${formatTime(article.date)}</p>
						<p class="author">by ${article.author}</p>
						<div>${article.description}</div>
						<a class="btn-more" href="${article.url}">read more</a>
					</div>
				</div><br><br>
				<hr></hr>
			</article>
			`;

			return tmpl;
		}, '');
	}
}
