import React, { Component } from 'react';
import { Grid, Form, Header, Segment, Button, Dropdown, Message } from 'semantic-ui-react'

import './App.css'
import { encrypt, decrypt } from './utils/utils'
import { key } from './utils/letterMap'

export default class extends Component {
  state = {
    n: "",
    e: "",
    text: "",
    outputText: "",
    type: "",
    errors: false
  }

  nChangeHandler = (e, value) => {
      this.setState({
          n: value.value
      })
  }

  eChangeHandler = (e, value) => {
      this.setState({
          e: value.value
      })
  }

  textChangeHandler = (e, value) => {
    this.setState({
        text: value.value
    })
  }

  typeChangeHandler = (e, value) => {
    this.setState({
        type: value.value
    })
  }

  submitHandler = () => {
      if (this.state.n == "" || this.state.e == "" || this.state.type == "" || this.state.text == "") {
          this.setState({
              errors: true
          })
      }
      else {
        this.setState({
            errors: false
        })
        if (this.state.type == "en") {
            let cipherText = encrypt(this.state.n, this.state.e, this.state.text, key)
            this.setState({
                outputText: cipherText
            })

        } else if (this.state.type == "de") {
            let plainText = decrypt(this.state.n, this.state.e, this.state.text, key)
            this.setState({
                outputText: plainText
            })
        }

        
      }
      
  }


  render() {
    return (
      <div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 700 }}>
                    <Header as='h1' color='teal' textAlign='center'>RSA Encryption</Header>
                    <Form size='large'>
                        <Segment stacked>
                        <Message negative visible={this.state.errors} hidden={!this.state.errors}>
                            <Message.Header>There are errors with this form</Message.Header>
                            <p>Please make sure all of the fields are filled out properly</p>
                        </Message>
                            <Form.Group widths='equal'>
                                <Form.Input fluid onChange={this.nChangeHandler} label="Choose your N:" placeholder="N = p * q where p, q are prime" />
                                <Form.Input fluid onChange={this.eChangeHandler} label="Choose your e:" placeholder="gcd(e, (p-1) * (q-1)) = 1" /> 
                                <Dropdown 
                                    style={{marginTop: '22px'}}
                                    fluid
                                    selection
                                    label="Encrypt or Decrypt" 
                                    placeholder='Encrypt or Decrypt' 
                                    options={[{key: 'en', value: 'en', text: 'Encrypt'}, {key: 'de', value: 'de', text: 'Decrypt'}]} 
                                    onChange={this.typeChangeHandler}    
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid onChange={this.textChangeHandler} type={this.state.type == "en" ? "password" : "text"} label= "Enter text" placeholder="Enter text..." />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Button color='teal' fluid onClick={this.submitHandler}>Submit</Button>
                            </Form.Group>
                            <Header as='h3' textAlign='center'>Output Text</Header>
                            <Segment raised>
                                {this.state.outputText}
                            </Segment>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
      </div>
    )
  }
}