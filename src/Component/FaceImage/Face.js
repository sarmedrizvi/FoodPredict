import React from 'react';
import './Face.scss'
import Clarifai from 'clarifai';
import { LimitedTextBox } from '../CustomTextBox/LimitedTextBox/LimitedTextBox';

const app = new Clarifai.App({
	apiKey: '0c91da893dce4c12be0e9461cc7b4567'
});
export class Face extends React.Component {


	state = {
		image: null,
		Url: '',
		food: []
	}

	onTextChange = (event) => {
		const { name, value } = event.target
		this.setState({ [name]: value })

	}
	onEnter = (event) => {
		if (event.keyCode === 13) {
			this.setState({ image: this.state.Url });
			const image = this.state.Url
			app.models.predict("bd367be194cf45149e75f01d59f77ba7", image).then(res => this.setState({ food: res.outputs[0].data.concepts }))

		}
	}
	onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();

			reader.onload = (e) => {
				this.setState({ image: e.target.result });
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	}
	render() {
		return (
			<div className='face' >
				<input type='file' accept=".jpg, .jpeg, .png" onChange={this.onImageChange} />
				<LimitedTextBox onTextChange={this.onTextChange} lefttext={''} name={'Url'} placeholder={'Enter url of image'} onEnter={this.onEnter} righttext={100000} />
				<img src={this.state.image} alt='' />
				<div className='props'>
					{this.state.food.map(item => <p>{item.name}</p>)}
				</div>
			</div>
		);
	}
}
