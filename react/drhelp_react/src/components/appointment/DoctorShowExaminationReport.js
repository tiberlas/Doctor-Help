import React,{Fragment} from 'react'
import Button from 'react-bootstrap/Button'

const completedStyle = {
    fontStyle: "italic",
    color: "#cdcdcd",
    textDecoration: "line-through"
}


class DoctorShowExaminationReport extends React.Component {

    generateMedicationArray = () => {
        let items = []
        for(let i = 0; i < this.props.report.medicationArray.length; i++) {
        items.push(<span class="text-muted" key = {i}> - {this.props.report.medicationArray[i].medicationName}</span>)
        items.push(<br/>)
        }
        return items
    }

    render() {

        if(this.props.event.status !== 'DONE')
        return null //problem sa renderovanjem modala nakon klika na DONE modal gde u APPROVED ili AVAILABLE modalu takodje ispisuje ove podatke (a ne bi smeo)

        return(
            <Fragment>
                <hr/>
                <h4> Examination report: </h4>
                <br/>
                Diagnosis: {this.props.report.diagnosis} <br/>
                Medication:  <br/>
                <p style = {this.props.report.nurseSigned ? completedStyle : null}> 
                {this.generateMedicationArray()} </p>

                {this.props.report.nurseSigned ? <div class="text-muted" style={{fontStyle: 'italic'}}><br/>Signed off by {this.props.report.nurse}</div>
                :  <div class="text-muted"style={{fontStyle: 'italic'}}><br/>Not yet signed off</div>}

                <div class="text-muted" style={{fontStyle: 'italic'}}>Examined by {this.props.event.doctor}</div>

                Additional doctor notes: {this.props.report.note}
                <br/>
                {this.props.report.myExamination && <Button className="btn btn-success">Update</Button>}

                <hr/>
            </Fragment>
        )
    }
}

export default DoctorShowExaminationReport