import React from 'react';
import { WithTranslation } from 'react-i18next';

import { JustSermonSeries } from '../../lib/types';

interface SeriesSelectorProps extends WithTranslation {
    handleChange(e: React.FormEvent<HTMLSelectElement>): void;
    series: JustSermonSeries[];
    isDisabled: boolean;
    selected: string;
}

export const SeriesSelector: React.SFC<SeriesSelectorProps> = props => {
    return (
        <div className='my-2 mr-3'>
            <select
                aria-label={props.t('selectSeries')}
                onChange={props.handleChange}
                disabled={props.isDisabled}
                className='custom-select'
                value={props.selected}
                name='series'
            >
                <option
                    label={props.t('selectSeries')}
                    value=''
                >
                    {props.t('selectSeries')}
                </option>
                {
                    props.series.map(item => (
                        <option
                            key={item.id}
                            label={item.title}
                            value={item.slug}
                        >
                            {item.title}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};
