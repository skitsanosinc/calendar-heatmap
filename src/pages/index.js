import {Card, Col, Popover, Row} from 'antd';
import React from 'react';

const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');
dayjs.extend(isoWeek);

const arrayToMatrix = (arr, width) =>
    arr.reduce((rows, key, index) => (index % width == 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows, []);

const startDate = dayjs().subtract(45, 'd').isoWeekday(1);
const arrayOfDates = Array.from({length: 91}, (el, index) =>
    ({
        date: startDate.add(index, 'd').format('YYYY-MM-DD'),
        events: Array.from({length: Math.floor(Math.random() * 10)}, () => ({}))
    }));

const formattedArray = arrayToMatrix(arrayOfDates, 7);

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getTileColor = (date, n) =>
{
    if (date === dayjs().format('YYYY-MM-DD'))
    {
        return '#7cd27c';
    }
    const palette = [
        '#fafafa',
        '#ecf8ff',
        '#d8f1ff',
        '#c4eaff',
        '#b1e3ff',
        '#9ddbff',
        '#8ad4ff'
    ];
    if (n === 0)
    {
        return palette[0];
    }
    else
    {
        if (n >= 5)
        {
            return palette[6];
        }
        else
        {
            return palette[n];
        }
    }
};

export default () =>
{
    return <Card>
        <div>{startDate.toString()} - {startDate.add(91).toString()}</div>

        {Array.from({length: 7}, () => ({})).map((el, index) => <Row gutter={16}
                                                                     key={`rows-${index}`}>
            <Col span={6}>
                <div className={'h-box flex-no-wrap'}>
                    <div className={'day-of-week'}>{daysOfWeek[index]}</div>
                    {Array.from({length: 13}, () => ({})).map((col_el, col_index) => <div key={`col-${col_index}`}
                                                                                          className={'day-tile'}>
                        <Popover content={<div>
                            <div>{formattedArray[col_index][index].date}</div>
                            <div>Events: {formattedArray[col_index][index].events.length}</div>
                        </div>}>
                            <div style={{
                                backgroundColor: getTileColor(formattedArray[col_index][index].date, formattedArray[col_index][index].events.length)
                            }}/>
                        </Popover>
                    </div>)}
                </div>
            </Col>
        </Row>)}
    </Card>;
};
