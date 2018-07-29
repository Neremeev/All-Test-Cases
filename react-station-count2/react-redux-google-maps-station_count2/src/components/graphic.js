import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs-2';

class Graphic extends Component {

    state = {
        random: 0,
    }

    shouldComponentUpdate(nextProps) {
        if ( this.state.random !== nextProps.random)
        {
            return true;
        } else {

            return false;
        }

    }

    componentWillUpdate(nextProps) {
        this.setState({
            random: nextProps.random
        })
    }

    render() {
        const check_ins = this.props.check_ins.slice();
        const activeObject = this.props.activeObject;
        const activeCheck_ins = {
            count: [],
            time: [],
        };

        for(let t = 0; t < 24; t++) {

            t = String(t);
            let totalCount = 0;

            for (let i = 0; i < check_ins.length; i++) {

                let str = check_ins[i].time.split(':')

                if (t === str[0]) {

                    for (let j = 0; j < check_ins[i].stations_checkins_count.length; j++) {

                        if (check_ins[i].stations_checkins_count[j].id_station === activeObject.id) {

                            totalCount += Number(check_ins[i].stations_checkins_count[j].count)

                        }
                    }
                }

            }

            let time = 'c ' + t + ' до ' + (+t + 1);
            activeCheck_ins.count.push(totalCount);
            activeCheck_ins.time.push(time);

        }
        const {time, count} = activeCheck_ins;
        const data = {
            labels  : time,
            datasets: [
                {
                    label               : 'Количество чекинов',
                    backgroundColor     : 'rgba(255,99,132,0.2)',
                    borderColor         : 'rgba(255,99,132,1)',
                    borderWidth         : 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor    : 'rgba(255,99,132,1)',
                    data                : count
                }
            ]
        };
        return (
            <div>
                <h2>{activeObject.name}</h2>
                <Bar
                    data={data}
                    width={100}
                    height={50}
                    options={{}}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeObject: state.session.activeObject,
        check_ins: state.session.check_ins,
        random: state.session.random
    }
}

export default connect(mapStateToProps)(Graphic)