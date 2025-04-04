package hagimetaceinture.server.message;

import java.sql.Date;

import hagimetaceinture.server.forumtopic.ForumTopic;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMessage;

    @ManyToOne
    private ForumTopic subject;

    private String text;

    private Date dateOfPublication;
    

    public Message(ForumTopic forumTopic, String text) {
        this.subject = forumTopic;
        this.text = text;
    }

    public Message() {
    }

    public long getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(long idMessage) {
        this.idMessage = idMessage;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "Message [idMessage=" + idMessage + ", subject=" + subject + ", dateOfPublication="+ dateOfPublication + ", text=" + text + "]";
    }

    public ForumTopic getSubject() {
        return subject;
    }

    public void setSubject(ForumTopic subject) {
        this.subject = subject;
    }

    public Date getDateOfPublication() {
        return dateOfPublication;
    }

    public void setDateOfPublication(Date dateOfPublication) {
        this.dateOfPublication = dateOfPublication;
    }

    

}
