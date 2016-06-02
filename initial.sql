INSERT INTO remembered.user_model (username, email) VALUES ('user1', 'user1@gmail.com');

INSERT INTO remembered.label_model (user_id, title) VALUES (1, 'label1');
INSERT INTO remembered.label_model (user_id, title) VALUES (1, 'label2');
INSERT INTO remembered.label_model (user_id, title) VALUES (1, 'new label1');
INSERT INTO remembered.label_model (user_id, title) VALUES (1, 'new label2');
INSERT INTO remembered.label_model (user_id, title) VALUES (1, 'label4');
INSERT INTO remembered.label_model (user_id, title) VALUES (1, '라벨6');
INSERT INTO remembered.label_model (user_id, title) VALUES (1, '라벨16');
INSERT INTO remembered.label_model (user_id, title) VALUES (1, '라벨17');

INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, 'title1111', '<p>one note</p><p>one note</p>');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, 'title222', 'content2');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, 'note3', 'note3note3');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, 'sample note1', 'i''m note1');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, '새로운 메모1', '<p>새로운 메모1의 내용</p>');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, '새로운 메모2', '<p>새로운 메모2의 내용</p>');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, 'aa', '<p>bb</p>');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, 'aa', '<p>cc</p>');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, 'aa', '<p>dd</p>');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, 'aa', '<p>ee</p>');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, 'aa', '<p>fff</p>');
INSERT INTO remembered.note_model (user_id, title, content) VALUES (1, 'aaa', '<p>gggg</p>');

INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 1, 3);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 2, 3);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 6, 3);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 1, 2);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 2, 2);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 1, 7);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 2, 7);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 1, 8);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 2, 8);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 1, 9);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 2, 9);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 2, 1);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 4, 1);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 6, 1);
INSERT INTO remembered.labelling_model (user_id, label_id, note_id) VALUES (1, 8, 1);
