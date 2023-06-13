import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AbcIcon from '@mui/icons-material/Abc';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import NotesIcon from '@mui/icons-material/Notes';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { useRef, useReducer } from 'react';

export default function App() {
  const STORAGEKEY = `db`;
  const load = () => {
    try {
      return (JSON.parse(window.localStorage.getItem(STORAGEKEY)!) ?? []) as string[][];
    } catch {
      window.localStorage.setItem(STORAGEKEY, `[]`);
      return [];
    }
  };

  const keyref = useRef<HTMLInputElement>();
  const valref = useRef<HTMLInputElement>();
  const [, render] = useReducer(() => ({}), {});

  const db = load();

  const fadd = () => {
    db.push([keyref.current!.value, valref.current!.value]);
    db.sort();
    window.localStorage.setItem(STORAGEKEY, JSON.stringify(db));
    keyref.current!.value = ``;
    valref.current!.value = ``;
    render();
  };
  const fdel = (i: number) => {
    db.splice(i, 1);
    db.sort();
    window.localStorage.setItem(STORAGEKEY, JSON.stringify(db));
    keyref.current!.value = ``;
    valref.current!.value = ``;
    render();
  };
  const fsav = () => {
    alert(`TODO`);
  };

  return <List>
    <ListItem>
      <ListItemIcon><SearchIcon color="primary" /></ListItemIcon>
      <ListItemText>
        <TextField inputRef={keyref} autoFocus fullWidth variant="standard" margin="normal" onChange={render} />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={fsav}><DownloadIcon color="primary" /></IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemIcon><NotesIcon color="primary" /></ListItemIcon>
      <ListItemText>
        <TextField inputRef={valref} fullWidth margin="normal" disabled={(keyref.current?.value?.length ?? 0) === 0} onChange={render} />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={fadd} disabled={(keyref.current?.value?.length ?? 0) === 0 || (valref.current?.value?.length ?? 0) === 0}><AddIcon color="primary" /></IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    {
      db.filter(([primary]) => primary.includes(keyref.current?.value ?? ``)).map(
        ([primary, secondary], i) => <ListItem key={i}>
          <ListItemIcon><AbcIcon color="primary" /></ListItemIcon>
          <ListItemText primary={primary} secondary={secondary}></ListItemText>
          <ListItemSecondaryAction>
            <IconButton onClick={() => fdel(i)}><DeleteIcon color="primary" /></IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    }
  </List>;
}
