package jla44.AmericanFootball.NFL_History.player;


import jakarta.persistence.*;

@Entity
@Table(name = "player_stats")
public class NFLPlayer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long player_id;

    private Integer season;

    @Column(name = "player")
    private String name;

    private String team;

    private Integer age;

    private String position;

    private Integer games_played;

    private Integer games_started;

    private Integer rushing_touchdowns;

    private Integer recieving_touchdowns;

    public NFLPlayer() {
    }

    //By downloading the lombok dependency I am able to use the annotations @Data, @NoArgsConstructor, @AllArgsConstructor
    //Just implementing constructors, getters, and setter for the purpose of OOP practice
    public NFLPlayer(Long player_id, Integer season, String name, String team, Integer age, String position,
                     Integer games_played, Integer games_started, Integer rushing_touchdowns, Integer recieving_touchdowns)
    {
        this.player_id = player_id;
        this.season = season;
        this.name = name;
        this.team = team;
        this.age = age;
        this.position = position;
        this.games_played = games_played;
        this.games_started = games_started;
        this.rushing_touchdowns = rushing_touchdowns;
        this.recieving_touchdowns = recieving_touchdowns;
    }

    public Long getPlayer_id() {
        return player_id;
    }

    public void setPlayer_id(Long player_id) {
        this.player_id = player_id;
    }
/*------------------------------------------------------------------------------------------*/
    public Integer getSeason() {
        return season;
    }

    public void setSeason(Integer season) {
        this.season = season;
    }
    /*--------------------------------------------------------------------------------------*/
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    /*--------------------------------------------------------------------------------------*/
    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }
    /*--------------------------------------------------------------------------------------*/
    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
    /*--------------------------------------------------------------------------------------*/
    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
    /*--------------------------------------------------------------------------------------*/
    public Integer getGames_played() {
        return games_played;
    }

    public void setGames_played(Integer games_played) {
        this.games_played = games_played;
    }
    /*--------------------------------------------------------------------------------------*/
    public Integer getGames_started() {
        return games_started;
    }

    public void setGames_started(Integer games_started) {
        this.games_started = games_started;
    }
    /*--------------------------------------------------------------------------------------*/
    public Integer getRushing_touchdowns() {
        return rushing_touchdowns;
    }

    public void setRushing_touchdowns(Integer rushing_touchdowns) {
        this.rushing_touchdowns = rushing_touchdowns;
    }
    /*--------------------------------------------------------------------------------------*/
    public Integer getRecieving_touchdowns() {
        return recieving_touchdowns;
    }

    public void setRecieving_touchdowns(Integer recieving_touchdowns) {
        this.recieving_touchdowns = recieving_touchdowns;
    }
}
