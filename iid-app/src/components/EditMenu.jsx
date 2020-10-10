import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-bootstrap';

class EditMenu extends React.Component {
    render () {
        return (
            <div>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}> {/* space around not working right now*/}
                    <Button>Save</Button>
                    <Button>Edit Wall Size/Color</Button>
                    <Button>Import Photo</Button>
                    <Button>Clear</Button>
                </View>
            </div>
        )
    }
}

export default EditMenu;
