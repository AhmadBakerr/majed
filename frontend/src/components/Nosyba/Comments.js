import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { db } from '../firebase-config';
import { collection, addDoc, serverTimestamp, query, onSnapshot, where, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
// call it using <Comments itemId={itemId} />
function Comments({ itemId }) {
    const [user] = useAuthState(auth);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("itemId", "==", itemId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const commentsArray = snapshot.docs.map(doc => {
                const data = doc.data();
                const createdAt = data.createdAt ? (data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt)) : new Date();
                return {
                    _id: doc.id,
                    ...data,
                    createdAt: createdAt
                };
            });
            setComments(commentsArray);
        }, (error) => {
            console.error('Failed to fetch comments', error);
        });

        return () => unsubscribe();
    }, [itemId]);


    const handleCommentAndLog = async () => {
        if (!newComment.trim()) return;
    
        try {
            const docRef = await addDoc(collection(db, 'comments'), {
                itemId: itemId,
                text: newComment,
                user: user.displayName || user.email,
                createdAt: serverTimestamp()
            });
            setNewComment("");
    
            const newCommentData = {
                _id: docRef.id,
                itemId: itemId,
                text: newComment,
                user: user.displayName || user.email,
                createdAt: new Date()
            };
            setComments([...comments, newCommentData]);
    
            const response = await fetch('http://localhost:5000/log-comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([newCommentData]) 
            });
            if (response.ok) {
                console.log('Comments log sent successfully');
            } else {
                throw new Error('Failed to send comments log');
            }
        } catch (error) {
            console.error('Failed to add comment or send log:', error);
        }
    };
    

    return (
        <Row>
            <Col md={12}>
                <h3>Comments</h3>
                {comments.map((comment) => (
                    <div key={comment._id} className="bg-light p-3 mb-2 d-flex align-items-start">
                        <img src={comment.userPhotoUrl || 'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png'} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                        <div>
                            <p><strong>{comment.user}</strong>: {comment.text}</p>
                            <small>Commented at {comment.createdAt.toLocaleString()}</small>
                        </div>
                    </div>
                ))}
                {user && (
                    <>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                id="newComment"
                                rows="3"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                placeholder="Write your comment"
                            ></textarea>
                        </div>
                        <button className="btn btn-primary" onClick={handleCommentAndLog} disabled={!newComment.trim()}>Add Comment</button>
                    </>
                )}
            </Col>
        </Row>
    );
}

export default Comments;