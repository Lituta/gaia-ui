import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class DialogSelect extends React.Component {
  state = {
    open: false,
    selected: '',
  };

  handleChange = name => event => {
    this.setState({ selected: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCloseCancel = () => {
    this.setState({ open: false });
  };

  handleCloseOk = () => {
    this.setState({ open: false });
    this.props.onOk(this.state.selected);
  };

  render() {
    const { options, title, selected } = this.props;
    return (
      <div style={{padding: "5px 0"}}>
        <span style={{
          borderBottom: "1px solid #ccc",
          display: "inline-block",
          verticalAlign: "bottom",
          padding: "0 5px"
        }}>{options[selected] ? options[selected].label : `please select a ${title}`}</span>
        <button onClick={this.handleClickOpen}>change</button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Change {title}</DialogTitle>
          <DialogContent>
            <form>
              <FormControl>
                <Select
                  value={this.state.selected}
                  onChange={this.handleChange()}
                >
                  { Object.keys(options).map(function(key) {
                      return <MenuItem value={key} key={key}>{options[key].label}</MenuItem> ;
                    })
                  }
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseOk} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DialogSelect;
