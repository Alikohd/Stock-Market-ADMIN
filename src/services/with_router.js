import { useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        // navigate для перехода между маршрутами
        const navigate = useNavigate();

        return (
            <Component
                navigate={navigate}
                {...props}
            />
        );
    };

    return Wrapper;
};