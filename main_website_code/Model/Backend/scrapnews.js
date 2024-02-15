//https://newsapi.org/v2/top-headlines/sources?apiKey=2cd5d5f42f334f66924e56ba2f9b5f64

let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=2cd5d5f42f334f66924e56ba2f9b5f64"

const fetchnews = async () => {
    let response = await fetch(url)
    let json = await response.json()

    let allnews = []

    await json.articles.forEach(element => {

        let title = element.title
        let description = element.description + "content is : " + element.content
        let url = element.url
        let imageurl = element.urlToImage
        let publishedAt = element.publishedAt
        let source = element.source.name

        let newjson = { title, description, url, imageurl, publishedAt, source }

        allnews.push(newjson)

    });
    return allnews;
}


module.exports = fetchnews