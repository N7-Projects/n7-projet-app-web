package hagimetaceinture.server.forumtopic;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ForumTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idForumTopic;

    private String title;

    public ForumTopic(String title) {
        this.title = title;
    }

    public ForumTopic() {
    }

    public long getIdForumTopic() {
        return idForumTopic;
    }

    public void setIdForumTopic(long idForumTopic) {
        this.idForumTopic = idForumTopic;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "ForumTopic [idForumTopic=" + idForumTopic + ", title=" + title + "]";
    }

}
