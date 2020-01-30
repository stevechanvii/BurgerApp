import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;
    // beforeEach() will automatically be executed before each of your tests
    beforeEach(() => {
        /**
         * shallow renders the component with all its content but the content isn't deeply rendered.
         * don't then render a whole sub tree of components, which is nested inside its included components.
         */
        wrapper = shallow(<NavigationItems />);
    })
    // it() allows you to write one individual test
    it('should render two <NavigationItems /> elements if not authenticated', () => {
        /**
         * expect() define the thing we want to check
         * find() look into the wrapper and see if it contains a certain content
         * toHaveLength() called how many times
         */
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});