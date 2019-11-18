import React from 'react';
import { Consumer } from '../../services/OffertContext'
import OffertItem from './components/offert-item';
import _ from 'lodash'
import EmptyOffertList from './components/empty-list';

export default function Tab2(props) {
    return (
        <Consumer>
            {(props) => {
                const offertsInactive = _.filter(props.offerts, (offert) => !offert.active)
                if(_.isEmpty(offertsInactive)){
                    return <EmptyOffertList/>
                }
                console.log("Consumer tab 1 ", props)
                return (
                    <div className="my-offerts-container">
                        {
                            _.map(offertsInactive, (offert) => {
                                return (
                                    <OffertItem key={offert.id} />
                                )
                            })
                        }
                    </div>
                )
            }}
        </Consumer>

    )
}


