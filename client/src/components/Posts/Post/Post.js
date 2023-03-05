import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [likes, setLikes] = useState(post?.likes);
    const hasLikedPost = post.likes.find((like) => like === user?.id);

    const handleLike = async () => {
        dispatch(likePost(post._id));
    
        if (hasLikedPost) {
          setLikes(post.likes.filter((id) => id !== user?.id));
        } else {
          setLikes([...post.likes, user?.id]);
        }
      };

      const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === user?.id)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
    

    return (
        <Card raised elevation={6} className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button 
                    style={{color: 'white'}} 
                    size="small" 
                    disabled={!user?.name}
                    onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize='default'/>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.name} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.id === post?.creator) && (<Button size="small" color="primary" disabled={!user?.name} onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    &nbsp;Delete
                </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post