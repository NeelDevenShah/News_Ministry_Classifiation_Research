import React from 'react'
import Newsitem from './Newsitem'
import { useLocation } from 'react-router-dom'

export const News = (props) => {

    let location = useLocation()
    let articles = location.state?.articles || props.state

    return (
        <>
            <div className="text-center my-3" style={{width:"99%"}}>
                <h1 className='my-4'>{location.state?.title.slice(5)}</h1>
                <div className="row justify-content-left my-2">
                    {articles?.map((element) => {
                        let imgurl = !element.imageurl ? "https://static.vecteezy.com/system/resources/thumbnails/004/844/745/original/icon-loading-10-circle-gradient-angle-loop-out-black-background-gradient-animation-for-game-animation-and-others-free-video.jpg" : element.imageurl;
                        return <Newsitem title={element.title} id={element._id} validation={element.validation} key={element._id} description={element.description} Imageurl={imgurl} url={element.url} date={new Date(element.publishedAt).toUTCString()
                        } author={!element.author ? "" : element.author} source={element.source} ministry={element.ministry} />
                    })}
                    {/* <div className="d-flex justify-content-between my-5">
                <button disabled={this.state.page <= 1} onClick={handlePrev} className="btn btn-dark"> &larr; Prev</button>
                <button disabled={this.state.page * 12 >= this.state.total} onClick={handleNext} className="btn btn-dark">Next &rarr;</button>
            </div> */}
                </div>
            </div>
        </>
    )
}


// export const News = (props) => {

//     // let handleNext = async () => {
//     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=2cd5d5f42f334f66924e56ba2f9b5f64&category=${this.props.category}&page=${this.state.page + 1}&pagesize=12`;

//     //     let data = await fetch(url, {
//     //         method: "GET",
//     //         headers: {
//     //             "Content-Type": "application/json",
//     //             "Accept": "application/json",
//     //         }
//     //     });
//     //     let parsed = await data.json();

//     //     this.setState({ articles: parsed.articles })
//     //     this.setState({ page: this.state.page + 1 })
//     // }
//     // let handlePrev = async () => {
//     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=2cd5d5f42f334f66924e56ba2f9b5f64&category=${this.props.category}&page=${this.state.page - 1}&pagesize=12`;

//     //     let data = await fetch(url);
//     //     let parsed = await data.json();

//     //     this.setState({ articles: parsed.articles })
//     //     this.setState({ page: this.state.page - 1 })
//     // }

//     // const articles = location.state.articles

//     return (

//     )
// }
