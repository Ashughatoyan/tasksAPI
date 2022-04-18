import React from 'react';
import Title from './component';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar/index';
import { css } from '@emotion/react';
import SettingsPage from './pages/settingsPage/index';
import TodoListPage from './pages/todoListPage/index';
import TodoSepPage from './pages/todoSepPage/index';
import Sign from './pages/signPage/index';

function App() {
  return (
      <div css={css`display:flex`}>
        <RecoilRoot>
          <Sidebar/>
        
          <BrowserRouter>
            <Routes>
              <Route path="/sign" element={ <Sign/> }></Route>
              <Route path="todo" element={ <TodoSepPage/> }></Route>
              <Route path="settings" element={ <SettingsPage/> }></Route>
              <Route path="/" element={ <TodoListPage/> }></Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </div>
  )
}

export default App;