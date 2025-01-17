import React from 'react';
import Form from 'react-bootstrap/Form';
function AdminProductControls({ setControlOptions, controlOptions }) {
	const handleControlsUpdate = (e) => {
		if (e.target.type === 'radio') {
			setControlOptions((prev) => ({
				...prev,
				[e.target.name]: e.target.value === 'true',
			}));
		} else
			setControlOptions((prev) => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
	};
	return (
		<section className='product-selector-outer-con'>
			<Form>
				<Form.Text>Satıcı Türü</Form.Text>
				<Form.Check
					value={false}
					name='sellerVerified'
					defaultChecked
					type='radio'
					label='Tümü'
					onChange={handleControlsUpdate}
				/>
				<Form.Check
					value={true}
					onChange={handleControlsUpdate}
					name='sellerVerified'
					type='radio'
					label='Doğrulanmış'
				/>
			</Form>
		</section>
	);
}
export default AdminProductControls;
