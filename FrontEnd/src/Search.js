import React, { useState, useEffect, useMemo } from 'react';
import { Menu, notification, Input, Button, List, Avatar } from 'antd';
import $ from 'jquery';
import './style.css';

function Search() {
  const { SubMenu } = Menu;
  const [userInfo, setUserInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([]);
  const [me, setMe] = useState([]);
 
  let IFrameAPIs = '';

  const openNotificationWithIcon = (type, title, text) => {
    notification[type]({
      message: title,
      description: text,
    });
  };

  const addMusic = e => {
    var name = e.target.attributes.item_name.value;
    var image = e.target.attributes.item_image.value;
    var uri = e.target.attributes.item_uri.value;
    var uid = userInfo._id;
    var token = localStorage.getItem('token');
    $.ajax({
      type: 'post',
      url: 'http://localhost:3007/music',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        name: name,
        image: image,
        uri: uri,
        uid: uid,
      },
      success: function(data) {
        openNotificationWithIcon('success', 'Music Tips', data.message + ' Search');
        console.log(data);
        window.location.reload();
      },
      error: function(data) {
        openNotificationWithIcon('error', 'User', data.responseJSON.message);
        setTimeout(function() {
          window.location.href = '/';
        }, 2000);
      },
    });
  };

  let search = e => {
    if (searchText != '') {
      var access_token = localStorage.getItem('access_token');
      var token = localStorage.getItem('token');
      $.ajax({
        type: 'get',
        url: 'http://localhost:3007/search?search=' + searchText + '&access_token=' + access_token,
        headers: {
          Authorization: 'Bearer ' + token,
        },
        success: function(data) {
          openNotificationWithIcon('success', 'Search Tips', data.message + ' Search');
          setItems(data.items);
          console.log(data);
        },
        error: function(data) {
          openNotificationWithIcon('error', 'User', data.responseJSON.message);
          setTimeout(function() {
            window.location.href = '/';
          }, 2000);
        },
      });
    } else {
      openNotificationWithIcon('error', 'Searcg Tips', 'The search content cannot be empty!');
    }
  };

  let playMusic = e => {
    var uri = e.target.attributes.item_uri.value;
    localStorage.setItem('music', uri);
    window.location.reload();
  };

  let loginOut = e => {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    alert('Exit successfully!');
    window.location.href = '/';
  };

  let deleteMusic = e => {
    var id = e.target.attributes.item_id.value;
    var token = localStorage.getItem('token');
    $.ajax({
      type: 'delete',
      url: 'http://localhost:3007/music',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        id: id,
      },
      success: function(data) {
        openNotificationWithIcon('success', 'Music Tips', data.message);
        window.location.reload();
      },
    });
  };

  window.onSpotifyIframeApiReady = IFrameAPI => {
    var music = localStorage.getItem('music');
    if (music == null) {
      music = 'spotify:track:3TjLFavKPwuvXk5xnxPlEk';
    }
    const element = document.getElementById('embed-iframe');
    const options = {
      width: '100%',
      height: '100',
      uri: music,
    };
    const callback = EmbedController => {
      document.querySelectorAll('.episode').forEach(episode => {
        episode.addEventListener('click', () => {
          EmbedController.loadUri(episode.dataset.spotifyId);
        });
      });
    };
    IFrameAPI.createController(element, options, callback);
  };

  useEffect(() => {
    var token = localStorage.getItem('token');
    $.ajax({
      type: 'get',
      url: 'http://localhost:3007/me?token=' + token,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      success: function(data) {
        console.log(data);
        setUserInfo(data.userInfo.user);
        $.ajax({
          type: 'get',
          url: 'http://localhost:3007/music?uid=' + data.userInfo.user._id,
          headers: {
            Authorization: 'Bearer ' + token,
          },
          success: function(data) {
            console.log(data);
            setMe(data.music_list);
          },
        });
      },
      error: function(data) {
        openNotificationWithIcon('error', 'User', data.responseJSON.message);
        setTimeout(function() {
          window.location.href = '/';
        }, 2000);
      },
    });
  }, []);

  return (
    <div>
      <Menu mode="horizontal">
        <span className="icon_title">Music search website</span>

        <SubMenu
          title={'Hello!' + userInfo.username}
          key="alipay"
          style={{ position: 'absolute', right: '1vw' }}
        >
          <Menu.Item onClick={loginOut}>Login Out</Menu.Item>
        </SubMenu>
      </Menu>

      <div className="search_box">
        <Input
          placeholder="Search Music"
          className="input_search"
          onChange={e => setSearchText(e.target.value)}
        />
        <Button className="button_search" onClick={search}>
          Search
        </Button>
      </div>

      <div className="music_box">
        <List
          itemLayout="horizontal"
          dataSource={items}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.album.images[0].url} />}
                title={<a href="#">{item.name}</a>}
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={addMusic}
                    item_name={item.name}
                    item_image={item.album.images[0].url}
                    item_uri={item.uri}
                  >
                    Add Music
                  </a>,
                ]}
              ></List.Item>
            </List.Item>
          )}
        />
      </div>

      <div className="love_list">
        <h2>Your playlist</h2>
        <List
          itemLayout="horizontal"
          dataSource={me}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={<a href="#">{item.name}</a>}
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <List.Item
                actions={[
                  <a key="list-loadmore-edit" onClick={playMusic} item_uri={item.uri}>
                    Play
                  </a>,
                  <a key="list-loadmore-edit" onClick={deleteMusic} item_id={item._id}>
                    Delete
                  </a>,
                ]}
              ></List.Item>
            </List.Item>
          )}
        />
      </div>

      <div id="embed-iframe"></div>
    </div>
  );
}

export default Search;
