from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, IntegerField, validators
from wtforms.fields import EmailField

class ApplicationForm(FlaskForm):
    position = SelectField('Position', 
                          choices=[('developer', 'MC Developer'), ('media', 'Media Team'), ('staff', 'Staff')],
                          validators=[validators.DataRequired()])
    
    name = StringField('Full Name', 
                      validators=[validators.DataRequired(), validators.Length(min=2, max=50)])
    
    email = EmailField('Email', 
                       validators=[validators.DataRequired(), validators.Email()])
    
    minecraft_username = StringField('Minecraft Username', 
                                   validators=[validators.DataRequired(), validators.Length(min=3, max=16)])
    
    discord = StringField('Discord Username', 
                         validators=[validators.DataRequired()])
    
    age = IntegerField('Age', 
                      validators=[validators.DataRequired(), validators.NumberRange(min=13, max=100)])
    
    timezone = StringField('Timezone', 
                          validators=[validators.DataRequired()])
    
    experience = TextAreaField('Previous Experience', 
                              validators=[validators.DataRequired(), validators.Length(min=50, max=1000)])
    
    why_join = TextAreaField('Why do you want to join our team?', 
                            validators=[validators.DataRequired(), validators.Length(min=50, max=1000)])
    
    availability = TextAreaField('Availability (hours per week, preferred times)', 
                                validators=[validators.DataRequired()])
