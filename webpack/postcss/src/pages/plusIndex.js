import React,{Component} from 'react';
import Header from 'component/header';
// import Swiper from 'component/swiper';
import Nav from 'component/nav';
import PageContent from 'component/pageContent';
import Footer from 'component/footer';
export default class PlusIndex extends Component{
    render(){
        return(
            <div>
                <Header />
                <Nav />
                {/* <Swiper/> */}
                <PageContent />
                <Footer/>
            </div>
        )
    }
}