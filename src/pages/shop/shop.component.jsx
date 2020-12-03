// import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import React from "react";
import { Route } from "react-router-dom";
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { createStructuredSelector } from "reselect";
import { selectCollectionsIsFetching } from "../../redux/shop/shop.selector";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions"


const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component  {
  componentDidMount() {
    const { updateCollections } = this.props;

    updateCollections();
  }
  
  
  render() {
    const {match, isFetching: loading} = this.props;
    
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={!loading} {...props}/>} />
        <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!loading} {...props}/>} />
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  updateCollections: () => dispatch(fetchCollectionsStart())
})

const mapStateToProps = createStructuredSelector({
  isFetching: selectCollectionsIsFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
