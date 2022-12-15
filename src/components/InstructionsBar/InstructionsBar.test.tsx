import InstructionsBar from './InstructionsBar';
import { renderWithProviders } from '../../utils/test';

describe('InstructionsBar', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };

  it('should render a "View challenges" button', () => {
    const { getByText } = renderWithProviders(<InstructionsBar {...defaultProps} />);
    expect(getByText('View challenges')).toBeInTheDocument();
  });

  // Challenge 3
  it('should call the onClick prop when the button is clicked', () => {
    // arrange
    const { getByText } = renderWithProviders(<InstructionsBar {...defaultProps} />);
    
    // act
    getByText('View challenges').click();

    // assert
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
