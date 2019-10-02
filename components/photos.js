import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadImgs, requestImgs } from '../store'
import axios from 'axios';
import css from "./styles.scss"
import cn from 'classnames'
import SearchForm from "./SearchForm"




const appId='22b7b54287910389edfae878f576488bbc5b540a46daa0d2833ba858ce03b143'
const baseUrl='https://api.unsplash.com/photos'

const mapStateToProps = state => {
  return { imgs: state.imgs, 
          count: state.count
  };
};


  
  const mapDispatchToProps = dispatch => {
    return {
      loadImgs: (jsonImgs) => dispatch(loadImgs(jsonImgs)),
      requestImgs: (curPage, query, perPage) => dispatch(requestImgs(curPage, query, perPage))
    };
  };
 
  
  const LOAD_STATE = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    LOADING: 'LOADING'
  };

var cnt_render=0





class Photos extends Component {

  constructor() {
    super();
    this.state = {
      totalPhotos: 0,
      perPage: 10,
      currentPage: 1,
      loadState: LOAD_STATE.LOADING,
      query:''
    }

    this.fetchPhotos = this.fetchPhotos.bind(this);
    this.reqImages = this.reqImages.bind(this);
    this.beginPhotos = this.beginPhotos.bind(this);    
  }



  componentDidMount() {
    //this.setState({ loadState: LOAD_STATE.SUCCESS });
    this.fetchPhotos(this.state.currentPage);
  }


  onPageChanged1 = (page) => {
    console.log('onPageChanged1.page='+page)
    var self = this;
    const { query } = this.state;


    console.log('query='+query+' this.state.currentPage='+this.state.currentPage)
    if (query === '') {
      this.fetchPhotos(page);
    }else{
      this.reqImages(query, page)
    }
  } 

  reqImages = (pquery='sun', ppage=1) => {
    const { perPage, currentPage, query } = this.state;
    let iquery= (pquery==='') ? query : pquery
    this.setState({ 
      query: iquery,
      currentPage: ppage
     });
    
    console.log('ppage='+ppage+' iquery='+iquery+' perPage='+perPage)
    this.props.requestImgs(ppage, iquery, perPage)	
  };


  beginPhotos() {
    this.fetchPhotos(1)
    this.setState({ 
      query: ''
     });
  }

  fetchPhotos(page) {
    
    var self = this;
    const { perPage } = this.state;
    //const { appId, baseUrl } = this.props;
    const options = {
      params: {
        client_id: appId,
        page: page,
        per_page: perPage
      }
    };
    
    this.setState({ loadState: LOAD_STATE.LOADING });

    axios.get(baseUrl, options)
      .then((response) => {
        console.log('after then((response)')
        this.props.loadImgs(response.data)
        //console.log(response.data)
        self.setState({
          totalPhotos: parseInt(response.headers['x-total']),
          currentPage: page,
          loadState: LOAD_STATE.SUCCESS
        });
      })
      .catch(() => {
        this.setState({ loadState: LOAD_STATE.ERROR });
      });
  }




  render() {
    const { imgs } = this.props
    
    //console.log('imgs')
    //console.log(imgs)
    return (     
      
      <div >
 
        <div className="inner">
          <SearchForm onSearch={this.reqImages} onClick1={this.beginPhotos}/>
        </div>


        <Pagination
          current={this.state.currentPage}
          total={this.state.totalPhotos} 
          perPage={this.state.perPage} 
          onPageChanged={this.onPageChanged1.bind(this)}
        />
        {this.state.loadState === LOAD_STATE.LOADING
            ? <div className={css.loader}></div>
            : <List data={imgs} />  
          }  
        
      </div>
    )
  }

}


const ListItem = ({ photo }) => {
  return (
    <div key={photo.id} className={cn(css.grid__item, css.card)}>
      <div className={css.card__body}>
        <a href={photo.urls.regular} target="_blank">
        <img src={photo.urls.small} alt="" />
        </a>
      </div>
      <div className={cn(css.card__footer, css.media)}>
        <img src={photo.user.profile_image.small} alt="" className={css.media__obj} />
        <div className={css.media__body}>
          <a href={photo.user.portfolio_url} target="_blank">{ photo.user.name } AAA</a>
        </div>
      </div>
    </div>
  )
}

const List = ({ data }) => {
  var items = data.map(photo => <ListItem key={photo.id} photo={photo}/>);
  return (
    <div className={css.grid}>
      { items }
    </div>
  )
}

class Pagination extends Component {  
  pages() {
    var pages = [];
    for(var i = this.rangeStart(); i <= this.rangeEnd(); i++) {
      pages.push(i)
    };
    return pages;
  }

  rangeStart() {
    var start = this.props.current - this.props.pageRange;
    return (start > 0) ? start : 1
  }

  rangeEnd() {
    var end = this.props.current + this.props.pageRange;
    var totalPages = this.totalPages();
    return (end < totalPages) ? end : totalPages;
  }

  totalPages() {
    return Math.ceil(this.props.total / this.props.perPage);
  }

  nextPage() {
    return this.props.current + 1;
  }

  prevPage() {
    return this.props.current - 1;
  }
  
  hasFirst() {
    return this.rangeStart() !== 1
  }

  hasLast() {
    return this.rangeEnd() < this.totalPages();
  }

  hasPrev() {
    return this.props.current > 1;
  }

  hasNext() {
    return this.props.current < this.totalPages();
  }

  changePage(page) {
    this.props.onPageChanged(page);
  }

  

  render() {
    
    return (
      <div className={css.pagination}>
        <div className={css.pagination__left}>
          <a href="#" className={!this.hasPrev() ? css.hidden: ''}
            onClick={e => this.changePage(this.prevPage())}
          >Prev</a>
        </div>

        <div className={css.pagination__mid}>
          <ul>
            <li className={!this.hasFirst() ? css.hidden : ''}>
              <a href="#" onClick={e => this.changePage(1)}>1</a>
            </li>
            <li className={!this.hasFirst() ? css.hidden : ''}>...</li>
            {
              this.pages().map((page, index) => {
                return (
                  <li key={index}>
                    <a href="#"
                      onClick={e => this.changePage(page)}
                      className={ this.props.current == page ? 'current' : '' }
                    >{ page }</a>
                  </li>
                );
              })
            }
            <li className={!this.hasLast() ? css.hidden : ''}>...</li>
            <li className={!this.hasLast() ? css.hidden : ''}>
              <a href="#" onClick={e => this.changePage(this.totalPages())}>{ this.totalPages() }</a>
            </li>
          </ul>
        </div>

        <div className={css.pagination__right}>
          <a href="#" className={!this.hasNext() ? css.hidden : ''}
            onClick={e => this.changePage(this.nextPage())}
          >Next</a>
        </div>
      </div>
    );    
  }
};

Pagination.defaultProps = {
  pageRange: 2
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photos)
