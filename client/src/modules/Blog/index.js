// @flow

import React from 'react';
import { parse } from 'himalaya';
import type { Props, State, Post, Author } from './types';
import config from './config';
import { Cell } from '../../containers';
import clap from '../../styles/images/clap_white.png';
import {
  ColContainer,
  RowContainer,
  Header,
  SubHeader,
  Grid,
  ImageContainer,
  Title,
  SubTitle,
  InfoContainer,
  ItemContainer,
  ProfileImageContainer,
  ClapImageContainer,
} from './components';

class Blog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.polling();
    this.intervalId = setInterval(this.tick, 1000 * 60 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  polling = () => {
    fetch(config.proxyUrl + config.baseUrl + this.props.sortBy)
      .then(res => res.text())
      .then(res => {
        const json = parse(res);
        const content = JSON.parse(
          json[1].children[1].children[6].children[0].content.slice(31, -8),
        );
        console.log(content);

        for (let i = 0; i < this.props.maxPosts; i += 1) {
          const post: Post = {
            title: content.posts[i].title,
            subtitle: content.posts[i].virtuals.subtitle,
            clapCount: content.posts[i].virtuals.totalClapCount,
            imageId: content.posts[i].virtuals.previewImage.imageId,
          };

          const authors: Author[] = Object.values(content.references.User);
          for (let j = 0; j < authors.length; j += 1) {
            if (authors[j].userId === content.posts[i].creatorId) {
              post.author = {
                name: authors[j].name,
                imageId: authors[j].imageId,
              };
              break;
            }
          }

          this.setState(prevState => ({
            posts: [...prevState.posts, post],
          }));
        }
      });
  };

  tick = () => {
    this.setState({
      posts: [],
    });
    this.polling();
  };

  intervalId: any;

  render() {
    const postRows = [];
    if (this.state.posts[this.props.maxPosts - 1]) {
      for (let i = 0; i < this.props.maxPosts; i += 1) {
        postRows.push(
          <ColContainer key={i}>
            <ImageContainer
              src={`https://cdn-images-1.medium.com/fit/t/320/160/${
                this.state.posts[i].imageId
              }`}
              alt=""
            />
            <Title>{this.state.posts[i].title}</Title>
            <SubTitle>{this.state.posts[i].subtitle}</SubTitle>
            <InfoContainer>
              <ItemContainer>
                <ProfileImageContainer
                  src={`https://cdn-images-1.medium.com/fit/c/72/72/${
                    this.state.posts[i].author.imageId
                  }`}
                />
                <SubTitle>{this.state.posts[i].author.name}</SubTitle>
              </ItemContainer>
              <ItemContainer>
                <ClapImageContainer src={clap} alt="" />
                <SubTitle>{this.state.posts[i].clapCount}</SubTitle>
              </ItemContainer>
            </InfoContainer>
          </ColContainer>,
        );
      }
    } else {
      return (
        <Cell row={this.props.row} column={this.props.column}>
          <div>Loading...</div>
        </Cell>
      );
    }
    return (
      <Cell row={this.props.row} column={this.props.column}>
        <ColContainer>
          <RowContainer>
            <Header>knowitlabs</Header>
          </RowContainer>
          <SubHeader>
            {this.props.sortBy
              .charAt(0)
              .toUpperCase()
              .concat(this.props.sortBy.slice(1))
              .concat(' posts')}
          </SubHeader>
          <Grid>{postRows}</Grid>
        </ColContainer>
      </Cell>
    );
  }
}

export default Blog;
