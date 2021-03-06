import React, { Component, PropTypes } from "react";
import FileInput from "react-file-input";
import { storage, database } from "./firebase";
import "./ProfileCard.css";

class ProfileCard extends Component {
	constructor(props) {
		super(props);

		this.storageRef = storage.ref("/user-images").child(props.uid);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.userRef = database.ref("/users").child(props.uid);
	}

	handleSubmit(event) {
		const file = event.target.files[0];
		const uploadTask = this.storageRef
			.child(file.name)
			.put(file, { contentType: file.type });

		uploadTask.then(snapshot => {
			this.userRef.child("photoURL").set(snapshot.downloadURL);
		});
	}

	render() {
		const { displayName, photoURL } = this.props.user;
		return (
			<article className="ProfileCard">
				<img src={photoURL} alt="" className="ProfileCard--photo" />
				<h3>{displayName}</h3>
				<FileInput
					accept=".png,.gif,.jpg"
					placeholder="Select an image"
					onChange={this.handleSubmit}
				/>
			</article>
		);
	}
}

ProfileCard.propTypes = {
	displayName: PropTypes.string,
	email: PropTypes.string,
	imageName: PropTypes.string,
	imageURL: PropTypes.string,
	photoURL: PropTypes.string,
	uid: PropTypes.string
};

export default ProfileCard;
