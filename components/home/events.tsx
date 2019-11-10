import React from 'react';
import { WithTranslation } from 'react-i18next';

import { Event } from '../../lib/types';
import EventTile from './eventTile';

interface EventsProps extends WithTranslation {
    events: Event[];
}

const Events: React.FunctionComponent<EventsProps> = props => (
    <section>
        <h2 id='events' className='text-center title'>{props.t('events')}</h2>
        <div className='card-deck'>
            {
                props.events.map(e => (
                    <EventTile
                        {...e}
                        key={e.id}
                        t={props.t}
                        i18n={props.i18n}
                        tReady={props.tReady}
                    />
                ))
            }
        </div>
        <div className='d-flex mt-4'>
            <a
                id='all-events'
                className='btn btn-outline-warning hvr-icon-forward mt-5 mx-auto'
                href='/calendar'
            >
                {props.t('allEvents')}&nbsp;
                <i className='fas fa-arrow-circle-right hvr-icon' />
            </a>
        </div>
    </section>
);

export default Events;
